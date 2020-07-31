#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SmHolYjStack } from '../lib/sm-hol-yj-stack';

const app = new cdk.App();
new SmHolYjStack(app, 'SmHolYjStack');
