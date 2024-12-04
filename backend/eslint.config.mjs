import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
    rules: {
      indent: ["error", 2],
      "block-spacing": "error",
      "space-before-blocks": "error",
      "space-before-function-paren": "error",
      semi: "error",
      quotes: ["error", "single"],
      "brace-style": ["error", "stroustrup"],
      "object-curly-spacing": ["error", "always"],
      "no-extra-parens": "error",
      "func-call-spacing": "error",
      "comma-spacing": "error",

      "comma-dangle": ["error", {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "never",
        functions: "always-multiline",
      }],

      "default-param-last": "error",
      "no-array-constructor": "error",
      "no-dupe-class-members": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          "checksVoidReturn": false,
        },
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
