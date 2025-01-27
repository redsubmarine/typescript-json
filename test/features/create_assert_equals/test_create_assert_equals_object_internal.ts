import TSON from "../../../src";
import { ObjectInternal } from "../../structures/ObjectInternal";
import { _test_assert_equals } from "./../assert_equals/_test_assert_equals";

export const test_create_assert_equals_object_internal = _test_assert_equals(
    "object internal",
    ObjectInternal.generate,
    TSON.createAssertEquals<ObjectInternal>(),
);
