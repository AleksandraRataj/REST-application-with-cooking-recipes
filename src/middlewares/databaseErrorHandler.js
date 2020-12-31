const {
    ValidationError,
    NotFoundError,
    DBError,
    ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} = require('objection');

// In this example `res` is an express response object.

const databaseErrorHandler = (err,req,res,next) => {
    if (err instanceof ValidationError) {
        switch (err.type) {
            case 'ModelValidation':
                res.status(400).send({
                    message: err.message,
                    data: err.data
                });
                break;
            case 'RelationExpression':
                res.status(400).send({
                    message: 'RelationExpression',
                    data: {}
                });
                break;
            case 'UnallowedRelation':
                res.status(400).send({
                    message: err.type,
                    data: {}
                });
                break;
            case 'InvalidGraph':
                res.status(400).send({
                    message: err.type,
                    data: {}
                });
                break;
            default:
                res.status(400).send({
                    message: 'UnknownValidationError',
                    data: {}
                });
                break;
        }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: 'NotFound',
            data: {}
        });
    } else if (err instanceof UniqueViolationError) {
        res.status(409).send({
            message: 'Unique Violation',
            data: {
                columns: err.columns,
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
            message: 'NotNullViolation',
            data: {
                column: err.column,
                table: err.table
            }
        });
    } else if (err instanceof ForeignKeyViolationError) {
        res.status(409).send({
            message: err.message,
            type: 'ForeignKeyViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof CheckViolationError) {
        res.status(400).send({
            message: 'Check Violation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof DataError) {
        res.status(400).send({
            message: 'Invalid data',
            data: {}
        });
    } else if (err instanceof DBError) {
        res.status(500).send({
            message: 'Unknown Database Error',
            data: {}
        });
    } else {
        next(err);
    }
}

module.exports = databaseErrorHandler;