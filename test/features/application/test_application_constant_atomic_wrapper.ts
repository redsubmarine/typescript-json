import TSON from "../../../src";
import { ConstantAtomicWrapper } from "../../structures/ConstantAtomicWrapper";
import { _test_application } from "./_test_application";

export const test_application_constant_atomic_wrapper = _test_application(
    "wrapped atomic constant",
    TSON.application<[ConstantAtomicWrapper]>(),
    {
        schemas: [
            {
                oneOf: [
                    {
                        $ref: "#/components/schemas/ConstantAtomicWrapper_lt_IPointer_lt_boolean_gt__comma_IPointer_lt_number_gt__comma_IPointer_lt_string_gt__gt_",
                    },
                    {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/IPointer_lt_boolean_gt_",
                                },
                                {
                                    $ref: "#/components/schemas/IPointer_lt_number_gt_",
                                },
                                {
                                    $ref: "#/components/schemas/IPointer_lt_string_gt_",
                                },
                            ],
                        },
                        nullable: false,
                    },
                ],
            },
        ],
        components: {
            schemas: {
                ConstantAtomicWrapper_lt_IPointer_lt_boolean_gt__comma_IPointer_lt_number_gt__comma_IPointer_lt_string_gt__gt_:
                    {
                        type: "object",
                        properties: {},
                        nullable: false,
                    },
                IPointer_lt_boolean_gt_: {
                    type: "object",
                    properties: {
                        value: {
                            type: "boolean",
                            enum: [false, true],
                            nullable: false,
                        },
                    },
                    nullable: false,
                    required: ["value"],
                },
                IPointer_lt_number_gt_: {
                    type: "object",
                    properties: {
                        value: {
                            type: "number",
                            nullable: false,
                        },
                    },
                    nullable: false,
                    required: ["value"],
                },
                IPointer_lt_string_gt_: {
                    type: "object",
                    properties: {
                        value: {
                            type: "string",
                            nullable: false,
                        },
                    },
                    nullable: false,
                    required: ["value"],
                },
            },
        },
        purpose: "swagger",
        prefix: "#/components/schemas",
    },
);