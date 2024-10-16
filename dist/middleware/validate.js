"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        const a = schema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        });
        next();
    }
    catch (err) {
        next(res.status(400).json({
            status: 'fail',
            errors: err.errors,
        }));
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map