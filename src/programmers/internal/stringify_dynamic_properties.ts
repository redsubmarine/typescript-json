import ts from "typescript";

import { IdentifierFactory } from "../../factories/IdentifierFactory";
import { TemplateFactory } from "../../factories/TemplateFactory";

import { IExpressionEntry } from "../helpers/IExpressionEntry";
import { metadata_to_pattern } from "./metadata_to_pattern";

/**
 * @internal
 */
export function stringify_dynamic_properties(
    dynamic: IExpressionEntry[],
    regular: string[],
): ts.Expression {
    // BASIC STATMEMENT, CHECK UNDEFINED
    const statements: ts.Statement[] = [
        ts.factory.createIfStatement(
            ts.factory.createStrictEquality(
                ts.factory.createIdentifier("undefined"),
                ts.factory.createIdentifier("value"),
            ),
            ts.factory.createReturnStatement(
                ts.factory.createStringLiteral(""),
            ),
        ),
    ];

    // PREPARE RETURN FUNCTION
    const output = () => {
        const mapped = ts.factory.createCallExpression(
            IdentifierFactory.join(
                ts.factory.createCallExpression(
                    ts.factory.createIdentifier("Object.entries"),
                    undefined,
                    [ts.factory.createIdentifier("input")],
                ),
                "map",
            ),
            undefined,
            [
                ts.factory.createArrowFunction(
                    undefined,
                    undefined,
                    [
                        IdentifierFactory.parameter(
                            ts.factory.createArrayBindingPattern([
                                ts.factory.createBindingElement(
                                    undefined,
                                    undefined,
                                    "key",
                                ),
                                ts.factory.createBindingElement(
                                    undefined,
                                    undefined,
                                    "value",
                                ),
                            ]),
                        ),
                    ],
                    undefined,
                    undefined,
                    ts.factory.createBlock(statements),
                ),
            ],
        );
        const filtered = ts.factory.createCallExpression(
            IdentifierFactory.join(mapped, "filter"),
            undefined,
            [
                ts.factory.createArrowFunction(
                    undefined,
                    undefined,
                    [IdentifierFactory.parameter("str")],
                    undefined,
                    undefined,
                    ts.factory.createStrictInequality(
                        ts.factory.createStringLiteral(""),
                        ts.factory.createIdentifier("str"),
                    ),
                ),
            ],
        );
        return ts.factory.createCallExpression(
            IdentifierFactory.join(filtered, "join"),
            undefined,
            [ts.factory.createStringLiteral(",")],
        );
    };

    // WHEN REGULAR PROPERTY EXISTS
    if (regular.length)
        statements.push(
            ts.factory.createIfStatement(
                IdentifierFactory.join(
                    ts.factory.createArrayLiteralExpression(
                        regular.map((key) =>
                            ts.factory.createStringLiteral(key),
                        ),
                    ),
                    "some",
                ),
                ts.factory.createReturnStatement(
                    ts.factory.createStringLiteral(""),
                ),
            ),
        );

    // ONLY STRING TYPED KEY EXISTS
    const simple: boolean =
        dynamic.length === 1 &&
        dynamic[0]!.key.size() === 1 &&
        dynamic[0]!.key.atomics[0] === "string";
    if (simple === true) {
        statements.push(stringify(dynamic[0]!));
        return output();
    }

    // COMPOSITE TEMPLATE LITERAL TYPES
    for (const entry of dynamic) {
        const condition: ts.IfStatement = ts.factory.createIfStatement(
            ts.factory.createCallExpression(
                ts.factory.createIdentifier(
                    `RegExp(/${metadata_to_pattern(true)(entry.key)}/).test`,
                ),
                undefined,
                [ts.factory.createIdentifier("key")],
            ),
            stringify(entry),
        );
        statements.push(condition);
    }
    return output();
}

function stringify(entry: IExpressionEntry): ts.ReturnStatement {
    return ts.factory.createReturnStatement(
        TemplateFactory.generate([
            ts.factory.createCallExpression(
                ts.factory.createIdentifier("JSON.stringify"),
                [],
                [ts.factory.createIdentifier("key")],
            ),
            ts.factory.createStringLiteral(":"),
            entry.expression,
        ]),
    );
}