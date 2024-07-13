import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Rectangle} from 'recharts';



function BarChartComponent({ data }) {

    return (
        <BarChart width={800} height={400} data={data} margin={{top: 5,right: 30,left: 20,bottom: 5,}}>
            <XAxis 
            dataKey="gameweek" 
            interval={0} 
            tick={{ fontSize: 12 }} 
            label={{ value: 'Gameweek Number', 
                    position: 'insideBottom', 
                    offset: -5 }}
            />
            <YAxis 
            domain={[0,100]} 
            label={{ value: 'Similarity %', 
                    angle: -90, 
                    position: 'insideLeft', dy:40 }} 
            />
            <CartesianGrid stroke="grey" strokeDasharray="2 2" />
            <Bar dataKey="similarity" name="Similarity %" fill="purple" activeBar={<Rectangle stroke="purple"/>} barSize ={8} barGap={1} />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ marginLeft: 40 }}/>
            <Tooltip />
        </BarChart>

    )
}

export default BarChartComponent;
