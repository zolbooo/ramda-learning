import 'module-alias/register';
import 'source-map-support/register';

import { invokeTests } from './internal/testing';

import './getting_started';
import './combining_functions';
import './partial_application';
import './declarative_programming';
import './immutability_and_objects';
import './immutability_and_arrays';

import './exercises/objects_and_functions';

invokeTests();
