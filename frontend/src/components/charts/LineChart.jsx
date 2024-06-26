import { ResponsiveLine } from "@nivo/line";

const LineChart = ({
  isDashboard = false,
  data,
  legendText,
  isMobile = false,
}) => {
  const formatValue = (value) => `${value} €`;

  return (
    <ResponsiveLine
      data={data}
      colors={{ scheme: "category10" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      yFormat={formatValue}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={
        !isMobile && {
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : legendText,
          legendOffset: 36,
          legendPosition: "middle",
        }
      }
      axisLeft={{
        orient: "left",
        tickValues: isDashboard ? 5 : 10,
        tickValuesFormat: { formatValue },
        tickSize: 6,
        tickPadding: 5,
        tickRotation: -49,
        legend: isDashboard ? undefined : "Amount",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      pointSize={8}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, 0)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
