import TSON from "../../../src";
import { ToJsonAtomicUnion } from "../../structures/ToJsonAtomicUnion";
import { _test_stringify } from "./../stringify/_test_stringify";

export const test_create_stringify_to_json_atomic_union = _test_stringify(
    "toJSON() method returning atomic union type",
    ToJsonAtomicUnion.generate,
    TSON.createStringify<ToJsonAtomicUnion>(),
);