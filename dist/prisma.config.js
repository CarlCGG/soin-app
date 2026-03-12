"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("prisma/config");
exports.default = (0, config_1.defineConfig)({
    engine: 'classic',
    datasource: {
        url: 'postgresql://postgres:123456@localhost:5432/soindb?schema=public',
    },
});
//# sourceMappingURL=prisma.config.js.map