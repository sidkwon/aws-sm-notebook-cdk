import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SmHolYj from '../lib/sm-hol-yj-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SmHolYj.SmHolYjStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
