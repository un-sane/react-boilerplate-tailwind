module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                loose: true,
                modules: false,
                useBuiltIns: "usage",
                corejs: 3,
                targets: {
                    browsers: [
                        "last 2 iOS major versions",
                        "last 2 Safari major versions",
                        "last 2 Edge versions",
                        "last 4 Chrome versions",
                        "last 4 Firefox versions",
                    ],
                },
            },
        ],
        "@babel/react",
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                cwd: "babelrc",
                extensions: [".ts", ".tsx", ".js"],
                root: ["."],
                alias: {
                    "@root": ["."],
                    "@src": ["./src"],
                    "@public": ["./public"],
                    "@common": ["./src/common"],
                    "@contexts": ["./src/common/contexts"],
                    "@misc": ["./src/common/misc"],
                    "@styles": ["./src/common/styles"],
                    "@hooks": ["./src/common/hooks"],
                    "@store": ["./src/common/store"],
                    "@constants": ["./src/common/constants"],
                    "@components": ["./src/common/components"],
                    "@language": ["./src/common/language"],
                    "@features": ["./src/features"],
                },
            },
        ],
    ],
};