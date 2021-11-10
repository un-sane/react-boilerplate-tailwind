module.exports = {
    root: true,
    extends: ["plugin:react/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "simple-import-sort", "import", "prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            files: ["**/*.tsx"],
            rules: {
                "react/prop-types": "off",
            },
        },
    ],
    rules: {
        quotes: [2, "double"],
        "sort-imports": 0,
        "import/order": 0,
        "simple-import-sort/exports": 2,
        "simple-import-sort/imports": [
            2,
            {
                groups: [
                    ["^\\u0000"],
                    [
                        "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
                    ],
                    ["^react$"],
                    ["^@?\\w"],
                    ["^@root(/.*|$)"],
                    ["^@public(/.*|$)"],
                    ["^@src(/.*|$)"],
                    ["^@(common|contexts|misc|store|constants|styles|hooks|language|components|features)(/.*|$)"],
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                ],
            },
        ],
        "import/first": 2,
        "import/newline-after-import": 2,
        "import/no-duplicates": 2,
        "prettier/prettier": [
            2,
            {
                endOfLine: "auto",
            },
        ],
    },
};