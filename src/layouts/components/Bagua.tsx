import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Circle, Path, Group, Text } from "react-konva";
import type { MbtiType } from "@/lib/mbti";
import { MbtiService } from "@/lib/mbti";

interface BaguaProps {
  type: MbtiType;
}

export const Bagua = ({ type }: BaguaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setWidth(container.offsetWidth);
    setHeight(Math.min(container.offsetWidth * (2 / 3), 300));
  }, []);

  const centerY = height / 2;
  const radius = centerY * 0.5;
  const centerX = width / 2;

  const createYinYangPath = () => {
    const r = radius;
    const x = 0;
    const y = 0;
    return `
      M ${x} ${y - r}
      A ${r} ${r} 0 1 1 ${x} ${y + r}
      A ${r / 2} ${r / 2} 0 0 0 ${x} ${y}
      A ${r / 2} ${r / 2} 0 0 1 ${x} ${y - r}
      Z
    `;
  };

  const createBaguaSymbol = (word: string, index: number) => {
    const angle = (index - 2) * 45;
    const fontSize = 24;
    const distance = radius + fontSize * 1.25;
    const x = centerX + Math.cos((angle * Math.PI) / 180) * distance;
    const y = centerY + Math.sin((angle * Math.PI) / 180) * distance;

    const color = MbtiService.getColorByFunction(word, true)
      .replace("bg-", "")
      .split(" ")[0];

    const colorMap: Record<string, string> = {
      "blue-600": "#2563eb",
      "blue-400": "#60a5fa",
      "green-600": "#16a34a",
      "green-400": "#4ade80",
      "yellow-600": "#ca8a04",
      "yellow-400": "#facc15",
      "purple-600": "#9333ea",
      "purple-400": "#c084fc",
    };

    const fillColor = colorMap[color] || "#000000";

    return (
      <Group key={index} x={x} y={y} rotation={angle}>
        <Text
          text={word}
          rotation={90}
          fontSize={fontSize}
          y={-fontSize / 2}
          fill={fillColor}
          fontWeight="bold"
        />
      </Group>
    );
  };

  return (
    <div ref={containerRef}>
      {type && (
        <Stage width={width} height={height}>
          <Layer>
            <Circle
              x={centerX}
              y={centerY}
              radius={radius}
              stroke="#666"
              strokeWidth={2}
            />
            <Path
              x={centerX}
              y={centerY}
              data={createYinYangPath()}
              fill="white"
            />
            <Path
              x={centerX}
              y={centerY}
              data={createYinYangPath()}
              fill="black"
              rotation={180}
            />
            <Circle
              x={centerX}
              y={centerY - radius / 2}
              radius={radius / 8}
              fill="black"
            />
            <Circle
              x={centerX}
              y={centerY + radius / 2}
              radius={radius / 8}
              fill="white"
            />
            <Text
              text={type.type}
              x={centerX}
              y={centerY}
              fill="white"
              stroke="black"
              strokeWidth={1}
              fontSize={32}
              offsetX={(type.type?.length * 16) / 2}
              offsetY={16}
            />
            {type.functions.map((fun: string, i: number) =>
              createBaguaSymbol(fun, i)
            )}
          </Layer>
        </Stage>
      )}
    </div>
  );
};
