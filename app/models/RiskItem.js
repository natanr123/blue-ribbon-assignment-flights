import { withScope } from 'rails-like-scope';

const texts = {
  low: 'Great! your privacy risk level is Low. It will be very hard for a random person to scam, fraud or steal your identity',
  medium: `Your privacy risk level is Medium.
     It is usually not dangerous but you should consider harden you facebook privacy settings.
     It will be hard for a random person to scam, fraud or steal your identity`,
  high: `Your privacy risk level is High.
     You should consider harden you facebook privacy settings.
     It will be easy for a random person to scam, fraud or steal your identity`,
};

class RiskItem {
  constructor(type, level, description) {
    this.type = type;
    this.level = level;
    this.description = description;
    this.isPublic = 'no'; // legacy
  }

  toTableLine() {
    return {
      type: this.type,
      isPublic: this.isPublic ? 'Yes' : 'No',
      risk: this.level,
    };
  }

  levelAsNum() {
    switch (this.level) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      default:
        return 1;
    }
  }


  static sortByLevel(self) {
    return self.sort((a, b) => a.levelAsNum() - b.levelAsNum());
  }

  static reverse(self) {
    return self.reverse();
  }


  static highestRiskLevel(risksItems) {
    const temp = RiskItem.scope(risksItems)
      .filterPublic()
      .sortByLevel()
      .reverse()
      .finish();
    if (temp.length === 0) return 'low';
    return temp[0].level;
  }

  static generateMessage(risksItems) {
    const highest = RiskItem.highestRiskLevel(risksItems);
    switch (highest) {
      case 'low':
        return texts.low;
      case 'medium':
        return texts.medium;
      case 'high':
        return texts.high;
      default:
        return 'An error has occurred';
    }
  }
}

withScope(RiskItem).addScope('sortByLevel').addScope('reverse');
export default RiskItem;

