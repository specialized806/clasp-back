// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This file defines the 'setup-logs' command for the clasp CLI.

import {Command} from 'commander';
import {Clasp} from '../core/clasp.js';
import {intl} from '../intl.js';
import {GlobalOptions, assertGcpProjectConfigured, isInteractive, maybePromptForProjectId} from './utils.js';

interface CommandOptions extends GlobalOptions {}

export const command = new Command('setup-logs').description('Setup Cloud Logging').action(async function (
  this: Command,
): Promise<void> {
  const options: CommandOptions = this.optsWithGlobals();
  const clasp: Clasp = options.clasp;

  if (!clasp.project.projectId && isInteractive()) {
    await maybePromptForProjectId(clasp);
  }

  assertGcpProjectConfigured(clasp);

  if (options.json) {
    console.log(JSON.stringify({success: true}, null, 2));
    return;
  }

  const successMessage = intl.formatMessage({
    defaultMessage: 'Script logs are now available in Cloud Logging.',
  });
  console.log(successMessage);
});
