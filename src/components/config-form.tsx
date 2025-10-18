import type { ConfigContext } from "../config/fields";
import type { ConfigSchema } from "../config";
import { renderField } from "../utils/render-field";
import { Spinner } from "./spinner";

export const ConfigForm = ({
  prefix,
  config,
  context,
}: {
  prefix?: string;
  config: ConfigSchema;
  context: ConfigContext;
}) => {
  return (
    <form hx-post={`${prefix || ""}/configs/${config.slug}`}>
      {config.fields!.map((field) => {
        return renderField({ field, context });
      })}
      <button type="submit" className="btn btn-primary">
        <Spinner />
        Save
      </button>
    </form>
  );
};
