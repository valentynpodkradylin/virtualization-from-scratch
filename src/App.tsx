import {
  DynamicHeight,
  DynamicHeightImproved,
  Grid,
  Grid2,
  Simple,
} from "./examples";

import { CSSProperties, useState } from "react";

const styles = {
  buttonGrid: {
    display: "flex",
    gap: "10px",
    margin: "10px 0px",
  },
  button: {
    padding: "0px 24px",
    borderRadius: "8px",
    outline: "transparent solid 2px",
    borderColor: "transparent",
    backgroundColor: "#319795",
    color: "white",
    lineHeight: "1.2",
    fontWeight: "500",
    height: "3rem",
  },
} satisfies Record<string, CSSProperties>;

const examplesMap = {
  simple: Simple,
  dynamicHeight: DynamicHeight,
  dynamicHeightImproved: DynamicHeightImproved,
  grid: Grid,
  grid2: Grid2,
};

type Example = keyof typeof examplesMap;

export const App = () => {
  const [example, setExample] = useState<Example>("simple");
  const Component = examplesMap[example];
  return (
    <div>
      <div style={styles.buttonGrid}>
        {Object.keys(examplesMap).map((exampleKey) => (
          <button
            key={exampleKey}
            style={styles.button}
            onClick={() => setExample(exampleKey as Example)}
          >
            {exampleKey}
          </button>
        ))}
      </div>
      {<Component />}
    </div>
  );
};
