import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Masonry = styled.div<{ $repeat: number; $gap?: number }>`
  display: grid;
  grid-template-columns: ${({ $repeat }) =>
    $repeat ? `repeat(${$repeat}, 1fr)` : "repeat(16, 1fr)"};
  grid-gap: ${(props) => (props.$gap ? `${props.$gap}px` : "")};
`;

const Tile = styled.div<{
  $radius: number;
  $gridRow: number;
  $gridColumn: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  font-family: monospace, sans-serif;
  border-radius: ${(props) => (props.$radius ? `${props.$radius}px` : "")};
  grid-row: ${({ $gridRow }) =>
    Math.random() > 0.5 && $gridRow > 1 ? `span ${$gridRow}` : ""};
  grid-column: ${({ $gridColumn }) =>
    Math.random() > 0.5 && $gridColumn > 1 ? `span ${$gridColumn}` : ""};
`;

const Fields = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 16px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(3px);

  > div {
    margin-top: 16px;
  }
`;

const Field = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

type Config = {
  showNumbers: boolean;
  rowSpan: number;
  columnSpan: number;
  tileRadius: number;
  gap: number;
  repeat: number;
  loop: boolean;
  minValue: number;
};

function App() {
  const initialValues: Config = {
    showNumbers: true,
    rowSpan: 1,
    columnSpan: 1,
    tileRadius: 0,
    gap: 0,
    repeat: 12,
    loop: false,
    minValue: 20,
  };
  const [config, setConfig] = useState<Config>(initialValues);

  const regenerate = (): void => {
    return setConfig((prev) => ({
      ...prev,
      minValue: Math.ceil(Math.random() * 100) + 20,
    }));
  };

  const randomize = () => {
    setConfig({
      showNumbers: Math.random() > 0.5,
      rowSpan: Math.ceil(Math.random() * 20) + 1,
      columnSpan: Math.ceil(Math.random() * 20) + 1,
      tileRadius: Math.ceil(Math.random() * 20) + 1,
      gap: Math.ceil(Math.random() * 20) + 1,
      repeat: Math.ceil(Math.random() * 20) + 4,
      loop: false,
      minValue: Math.ceil(Math.random() * 100) + 20,
    });
  };

  const reset = () => {
    setConfig(initialValues);
  };

  useEffect(() => {
    if (config.loop) {
      setTimeout(regenerate, 1000);
    }
  }, [config.loop, regenerate]);

  return (
    <Container>
      <Fields>
        <ButtonContainer>
          <Field>
            Show numbers
            <input
              disabled={config.loop}
              type="checkbox"
              checked={config.showNumbers}
              onChange={() =>
                setConfig((prev) => ({
                  ...prev,
                  showNumbers: !prev.showNumbers,
                }))
              }
            />
          </Field>
          <Field>
            Loop
            <input
              type="checkbox"
              checked={config.loop}
              onChange={() =>
                setConfig((prev) => ({
                  ...prev,
                  loop: !prev.loop,
                }))
              }
            />
          </Field>
        </ButtonContainer>
        <Field>
          <button
            disabled={config.loop}
            onClick={() => {
              if (config.minValue > 20)
                setConfig((prev) => ({
                  ...prev,
                  minValue: prev.minValue - 1,
                }));
            }}
          >
            -
          </button>
          Min. number of blocks: {config.minValue}
          <button
            disabled={config.loop}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                minValue: prev.minValue + 1,
              }));
            }}
          >
            +
          </button>
        </Field>
        <Field>
          <button
            disabled={config.loop}
            onClick={() => {
              if (config.gap > 0)
                setConfig((prev) => ({
                  ...prev,
                  gap: prev.gap - 1,
                }));
            }}
          >
            -
          </button>
          Gap (px): {config.gap}
          <button
            disabled={config.loop}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                gap: prev.gap + 1,
              }));
            }}
          >
            +
          </button>
        </Field>
        <Field>
          <button
            disabled={config.loop}
            onClick={() => {
              if (config.tileRadius > 0)
                setConfig((prev) => ({
                  ...prev,
                  tileRadius: prev.tileRadius - 1,
                }));
            }}
          >
            -
          </button>
          Border radius (px): {config.tileRadius}
          <button
            disabled={config.loop}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                tileRadius: prev.tileRadius + 1,
              }));
            }}
          >
            +
          </button>
        </Field>
        <Field>
          <button
            disabled={config.loop}
            onClick={() => {
              if (config.repeat > 0)
                setConfig((prev) => ({
                  ...prev,
                  repeat: prev.repeat - 1,
                }));
            }}
          >
            -
          </button>
          Repeat: {config.repeat}
          <button
            disabled={config.loop}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                repeat: prev.repeat + 1,
              }));
            }}
          >
            +
          </button>
        </Field>
        <Field>
          <button
            disabled={config.loop}
            onClick={() => {
              if (config.rowSpan > 1)
                setConfig((prev) => ({
                  ...prev,
                  rowSpan: prev.rowSpan - 1,
                }));
            }}
          >
            -
          </button>
          Row span: {config.rowSpan}
          <button
            disabled={config.loop}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                rowSpan: prev.rowSpan + 1,
              }));
            }}
          >
            +
          </button>
        </Field>
        <Field>
          <button
            disabled={config.loop}
            onClick={() => {
              if (config.columnSpan > 1)
                setConfig((prev) => ({
                  ...prev,
                  columnSpan: prev.columnSpan - 1,
                }));
            }}
          >
            -
          </button>
          Column span: {config.columnSpan}
          <button
            disabled={config.loop}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                columnSpan: prev.columnSpan + 1,
              }));
            }}
          >
            +
          </button>
        </Field>

        <ButtonContainer>
          <button disabled={config.loop} type="button" onClick={randomize}>
            Randomize
          </button>
          <button disabled={config.loop} type="button" onClick={regenerate}>
            Regenerate
          </button>
          <button disabled={config.loop} type="button" onClick={reset}>
            Reset
          </button>
        </ButtonContainer>
      </Fields>
      <Masonry $gap={config.gap} $repeat={config.repeat}>
        {[...Array(config.minValue).keys()].map((i) => {
          return (
            <Tile
              key={i}
              style={{
                backgroundColor: `#${(0x1000000 + Math.random() * 0xffffff)
                  .toString(16)
                  .substr(1, 6)}`,
              }}
              $radius={config.tileRadius}
              $gridRow={config.rowSpan}
              $gridColumn={config.columnSpan}
            >
              {config.showNumbers ? i + 1 : ""}
            </Tile>
          );
        })}
      </Masonry>
    </Container>
  );
}

export default App;
