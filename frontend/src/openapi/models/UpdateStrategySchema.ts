/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.11.0-beta.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    ConstraintSchema,
    ConstraintSchemaFromJSON,
    ConstraintSchemaFromJSONTyped,
    ConstraintSchemaToJSON,
} from './ConstraintSchema';

/**
 * 
 * @export
 * @interface UpdateStrategySchema
 */
export interface UpdateStrategySchema {
    /**
     * 
     * @type {string}
     * @memberof UpdateStrategySchema
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateStrategySchema
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateStrategySchema
     */
    sortOrder?: number;
    /**
     * 
     * @type {Array<ConstraintSchema>}
     * @memberof UpdateStrategySchema
     */
    constraints?: Array<ConstraintSchema>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof UpdateStrategySchema
     */
    parameters?: { [key: string]: string; };
}

export function UpdateStrategySchemaFromJSON(json: any): UpdateStrategySchema {
    return UpdateStrategySchemaFromJSONTyped(json, false);
}

export function UpdateStrategySchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateStrategySchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'sortOrder': !exists(json, 'sortOrder') ? undefined : json['sortOrder'],
        'constraints': !exists(json, 'constraints') ? undefined : ((json['constraints'] as Array<any>).map(ConstraintSchemaFromJSON)),
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
    };
}

export function UpdateStrategySchemaToJSON(value?: UpdateStrategySchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'sortOrder': value.sortOrder,
        'constraints': value.constraints === undefined ? undefined : ((value.constraints as Array<any>).map(ConstraintSchemaToJSON)),
        'parameters': value.parameters,
    };
}

