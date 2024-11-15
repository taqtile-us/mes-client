import { ROLE } from "../models/enums/roles.enum";

const rolesPermissions: { [key in ROLE]: string[] } = {
    [ROLE.ADMIN]: [
        "create_order",
        "update_order",
        "view_order",
        "delete_order",
        "create_order_item",
        "update_order_item",
        "view_order_item",
        "delete_order_item",
        "add_order_operation_dynamic_info",
        "delete_order_operation_dynamic_info",
        "create_order_operation",
        "update_order_operation",
        "view_order_operation",
        "delete_order_operation",
        "proccess_qr_code_order_operation",
        "create_timespan_order_operation",
        "update_timespan_order_operation",
        "view_timespan_order_operation",
        "create_reference",
        "update_reference",
        "view_reference",
        "delete_reference",
        "create_reference_item",
        "update_reference_item",
        "view_reference_item",
        "delete_reference_item",
        "view_report",
        "add_operation",
        "update_operation",
        "view_operation",
        "add_item",
        "update_item",
        "view_item",
        "view_employee"
    ],
    [ROLE.WORKER]: [
        "proccess_qr_code_order_operation",
        "create_timespan_order_operation",
        "update_timespan_order_operation",
        "view_timespan_order_operation"
    ]
};

export default rolesPermissions;