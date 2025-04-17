import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import globals from 'globals';
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  {
    ignores: ["tests/*"]
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
  },
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
    files: ["src/**/*.ts"],
    rules: {
      indent: ["error", 2],
      "block-spacing": "error",
      "space-before-blocks": "error",
      "space-before-function-paren": "error",
      semi: "error",
      quotes: ["error", "single"],
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
      "@typescript-eslint/return-await": "error",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-call": "warn"
    },
  },
);
