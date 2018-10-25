import RiskItem from './RiskItem';

export class FriendsField {
  constructor(fbResponse) {
    this.fbResponse = fbResponse;
  }
  static getText1 = (level, count) => {
    const texts = {
      low: `You have only ${count} friends`,
      medium: `You have ${count} friends`,
      high: `You have than ${count}`,
    };
    return texts[level];
  };
  toRiskItem() {
    let count = this.fbResponse && this.fbResponse.summary && this.fbResponse.summary.total_count;
    if (count === undefined) {
      count = 0;
    }
    if (count < 100) {
      return new RiskItem('Less than 50 friends', 'low', FriendsField.getText1('low', count));
    } else if ((count >= 100) && (count < 300)) {
      return new RiskItem('More than 100 friends', 'medium', FriendsField.getText1('medium', count));
    }
    return new RiskItem('More than 300 friends', 'high', FriendsField.getText1('medium', count));
  }
}

function isStr(str) {
  return (typeof str === 'string');
}

export class AddressField {
  constructor(fbResponse) {
    this.fbResponse = fbResponse;
  }
  static getText2 = (level, text) => {
    const texts = {
      low: 'Your address is not your profile',
      medium: `You address is: ${text}`,
    };
    return texts[level];
  };
  toRiskItem() {
    const text = this.fbResponse && this.fbResponse.name;
    const exists = text && isStr(text) && (text.length > 0);
    if (exists) {
      return new RiskItem('Address In Profile', 'medium', AddressField.getText2('medium', text));
    }
    return new RiskItem('Address Not In Profile', 'low', AddressField.getText2('low', text));
  }
}

export class BirthdayField {
  constructor(fbResponse) {
    this.fbResponse = fbResponse;
  }
  static getText3 = (level, text) => {
    const texts = {
      low: 'Birthday is not your profile',
      medium: `Birthday is: ${text}`,
    };
    return texts[level];
  };
  toRiskItem() {
    const text = this.fbResponse;
    const exists = text && isStr(text);
    if (exists) {
      return new RiskItem('Birthday In Profile', 'medium', BirthdayField.getText3('medium', text));
    }
    return new RiskItem('Birthday Not In Profile', 'low', BirthdayField.getText3('low', text));
  }
}

export class EmailField {
  constructor(fbResponse) {
    this.fbResponse = fbResponse;
  }
  static getText4 = (level, text) => {
    const texts = {
      low: 'Your email is not your profile',
      medium: `You email is: ${text}`,
    };
    return texts[level];
  };
  toRiskItem() {
    const text = this.fbResponse;
    const exists = text && isStr(text) && (text.length > 0);
    if (exists) {
      return new RiskItem('Email In Profile', 'medium', EmailField.getText4('medium', text));
    }
    return new RiskItem('Email Not In Profile', 'low', EmailField.getText4('low', text));
  }
}
