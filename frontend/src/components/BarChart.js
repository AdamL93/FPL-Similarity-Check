import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Rectangle} from 'recharts';



function BarChartComponent({ data }) {

    return (
        <BarChart width={600} height={400} data={data} margin={{top: 5,right: 30,left: 20,bottom: 5,}}>
            <XAxis dataKey="gameweek" />
            <YAxis domain={[0,100]}/>
            <CartesianGrid stroke="grey" strokeDasharray="2 2" />
            <Bar dataKey="similarity" name="Similarity %" fill="purple" activeBar={<Rectangle stroke="purple"/>} barSize ={8} barGap={1} />
            <Legend />
            <Tooltip />
        </BarChart>

    )
}

export default BarChartComponent;
