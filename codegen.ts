import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "**/gql.ts",
  generates: {
    "src/types.ts": { plugins: ["typescript"] },
    "/src": {
      preset: "near-operation-file-preset",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
