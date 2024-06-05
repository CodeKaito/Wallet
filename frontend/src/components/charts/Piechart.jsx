import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  // const colors = ["purple_blue_green", "nivo", "accent", "paired"];
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "paired" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={45}
      arcLinkLabelsTextOffset={36}
      arcLinkLabelsTextColor="#000000"
      arcLinkLabelsOffset={24}
      arcLinkLabelsDiagonalLength={36}
      arcLinkLabelsStraightLength={36}
      arcLinkLabelsThickness={4}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabel={(e) => "€" + e.value}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 10]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 20,
          itemsSpacing: 0,
          itemWidth: 140,
          itemHeight: 35,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 25,
          symbolShape: "circle",
          itemTextColor: "#000000",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
