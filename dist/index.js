"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const presta_router_1 = __importDefault(require("../src/routes/presta.router"));
const database_service_1 = require("./services/database.service");
const database_2_1 = require("./services/database.2");
const presta_routermongo_1 = require("./routes/presta.routermongo");
const auth_router_1 = require("../src/routes/auth.router");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PrestaGo",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5080",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                }
            }
        }
    },
    apis: ["./dist/docs/*.js"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// app.use("/", (req, res) => {
// res.send("Hello World");
// })
(0, database_service_1.connectToDatabase)(), (0, database_2_1.connectDatabase)()
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
    app.use("/", presta_routermongo_1.prestaRouter);
    app.use("/auth", auth_router_1.authRouter);
    app.use("/api", presta_router_1.default);
})
    .catch((Error) => {
    console.error("Database connection failed", Error);
    process.exit();
});
exports.default = app;
//# sourceMappingURL=index.js.map