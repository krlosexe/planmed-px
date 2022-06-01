import React from 'react'
import { View, StatusBar, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native'
import ChartStatistic from '../components/ChartStatistic/Index'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { base_url, server1 } from '../Env'


function ChartsScreen(props){
    
    const { navigation } = props
    const userDetails  = React.useContext(UserContext)
    const [loading, setLoading ] = React.useState(true)
    const [stats, setStats] = React.useState({
      week : {
        datasets : {
          data : [0,0,0,0,0,0,0]
        }
      },
      month : {
        datasets : {
          data : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
      },
      year : {
        datasets : {
          data : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
      },
    })

    React.useEffect(()=>{
      setLoading(true)
      axios.get(base_url(server1,`prp/sales/statistics/${userDetails.user_id}`)).then((res)=>{
          setStats(res.data)
          setLoading(false)
      }).then(()=>{
          //. . . 
      }).catch((e)=>{
        setLoading(false)
        console.log(e)
      })

  },[])



    return(
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={styles.content}>
                    
                        <StatusBar
                        barStyle = "dark-content"
                        hidden = {false} 
                        backgroundColor = "white"
                        translucent = {true} />
                   

    <Text style={styles.chartLabel}>Ventas esta semana</Text>
    { (loading === false) && <ChartStatistic data={{
        labels: ["L", "M", "M", "J", "V", "S", "D"],
        datasets: [
          {
            data: stats.week.datasets.data
          }
        ]
      }} />
    }

<Text style={styles.chartLabel}>Ventas este mes</Text>
    <ChartStatistic data={{
      datasets: [
        {
          data: stats.month.datasets.data
          
        }
      ]
    }} />

<Text style={styles.chartLabel}>Ventas este año</Text>
    <ChartStatistic data={{
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago","Sep","Oct", "Nov","Dic"],
      datasets: [
        {
          data: stats.year.datasets.data
        }
      ]
    }} />

                        

                </View>

        </ScrollView>
    </SafeAreaView>
    )
}



export default ChartsScreen

const styles = StyleSheet.create({

    container : {
        flex : 1,
        flexDirection : "column",
        paddingTop : 50,
        backgroundColor : 'white'
    },

    scroll : {
        flex : 1,
        flexDirection : 'column',
    },
    content : {
        flex: 1,
        backgroundColor : 'white',
        flexDirection: 'column',
    },
    chartLabel : {
        fontSize : 22,
        marginBottom : 20,
        paddingLeft : 20
    }
  });
   
  