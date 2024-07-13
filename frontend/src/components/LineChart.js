import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend} from 'recharts';



function LineChartComponent({ data }) {

    return (
        <LineChart width={800} height={400} data={data}>
            <XAxis 
                dataKey="gameweek" 
                interval={0} 
                tick={{ fontSize: 12 }} 
                label={{ value: 'Gameweek Number', 
                        position: 'insideBottom', 
                        offset: -5 }} 
            />
            <YAxis 
            domain={[0, 100]} 
            label={{ value: 'Similarity %', 
                    angle: -90, 
                    position: 'insideLeft', 
                    dy:40 }} 
            />
            <CartesianGrid stroke="grey" strokeDasharray="2 2" />
            <Line type="linear" dataKey="similarity" name ="Similarity %" stroke="purple" strokeWidth={2} dot={false} />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ marginLeft: 40 }}/>
            <Tooltip />
        </LineChart>

    )
}

export default LineChartComponent;

