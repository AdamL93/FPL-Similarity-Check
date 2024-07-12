import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, BarChart, Bar, Rectangle} from 'recharts';



function LineChartComponent({ data }) {

    return (
        <LineChart width={600} height={400} data={data}>
            <XAxis dataKey="gameweek" />
            <YAxis domain={[0, 100]} />
            <CartesianGrid stroke="grey" strokeDasharray="2 2" />
            <Line type="linear" dataKey="similarity" name ="Similarity % by Gameweek" stroke="purple" strokeWidth={2} dot={false} />
            <Legend />
            <Tooltip />
        </LineChart>

    )
}

export default LineChartComponent;

