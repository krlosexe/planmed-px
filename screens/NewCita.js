import React, { useEffect, useContext, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, ImageBackground } from 'react-native';
import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
import Head from '../components/Head';
import { AllProcedures, AddCita, getSedes, getCitasByClient } from '../components/processItemShop'
import { primaryColor, colorBack, colorLight } from '../Colors.js'
import Calendary from '../components/Calendary'
import { Api, base_url } from '../Env'
import axios from 'axios'

function NewCita(props) {
  const { navigation } = props
  const [load, setload] = useState(true)
  const [user, setUser] = useState(0)
  const [itsSelectingHour, setitsSelectingHour] = useState(false); // selecciona fecha y hora?
  const [quoteExists, setquoteExists] = useState(false) // ya tienes citas?
  const [sedeList, setsedeList] = useState(false) // lista de sedes
  const [sede, setsede] = useState(false) // sede seleccionada
  const [ProcessList, setProcessList] = useState([]) //lista de procedimeintos
  const [procedure, setprocedure] = useState(false) //procedimeinto a realizar en la cita
  const [gettingDate, setgettingDate] = useState(false); //its getting date?
  const [gettinghour, setgettinghour] = useState(false); //its getting hour?
  const [listhours, setlisthours] = useState([]); // hours available
  const [date, setdate] = useState(false); // date selected
  const [hour, sethour] = useState(false); //hour selected
  const [Father, setFather] = useState(false)//tipo de tratamiento
  const [availableButton, setavailableButton] = useState(false) //boton visible?
  const [sendSuccess, setSendSuccess] = useState(false)//solicitud exitosa
  const [display, setdisplay] = useState(false); //open modal
  const [listTitle, setlistTitle] = useState(""); //title modal
  const [getF, setgetF] = useState(false);
  const [getP, setgetP] = useState(false);
  const [getS, setgetS] = useState(false);
  const [loadHours, setloadHours] = useState(false);

  const config = {
    theme: "",//light / dark
    color: primaryColor,//"#FF008B",
    minDateNow: true,
    hour: false,
    rangeDate: true,
  }

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    setUser(props.route.params.user)
    //getCitasByClient(props.route.params.user).then((data) => {
    //  setquoteExists(data.data)
    //})
    Get()
  }, [randomCode]);

  useEffect(() => {
    if (sendSuccess) {
      setTimeout(() => {
        goToScreen('Dashboard');
      }, 10000);
    }
  }, [sendSuccess]);

  useEffect(() => {
    if (procedure !== false) {
      if (procedure.name === "CITA DE REVISIÓN") {
        setitsSelectingHour(true)
        setavailableButton(false)
      }
      else {
        setitsSelectingHour(false)
      }
    }
  }, [procedure]);

  useEffect(() => {
    if (sede !== false && itsSelectingHour === false) {
      setavailableButton(true)
    }
    if (date !== false) {
      const horasdisponibles = async () => {
        setloadHours(true)
        console.log("???", base_url(Api, `get/availability/revision/${date}/${sede.id_clinic}`))
        await axios.get(base_url(Api, `get/availability/revision/${date}/${sede.id_clinic}`)).then(function (response) {
          setlisthours(response.data)
        }).then(setgettinghour(true))
          .catch(function (error) { console.log(error) })

        setloadHours(false)
      }
      horasdisponibles()
    }
  }, [itsSelectingHour, sede, date]);

  useEffect(() => {
    if (hour !== false) {
      setavailableButton(true)
    }
    else {
      setavailableButton(false)
    }
  }, [hour]);

  useEffect(() => {
    if (quoteExists) {
      setTimeout(() => {
        goToScreen('Dashboard');
      }, 10000);
    }
  }, [quoteExists]);

  async function Get() {
    console.log("get() init")
    const response = await getSedes()
    console.log("response: ", response)
    setsedeList(response)
    if (props.route.params.procedure === 0) {
      const prp = await AllProcedures()
      setProcessList(prp)
      setitsSelectingHour(false)
    }
    else {
      setprocedure(props.route.params.procedure)
    }
    setload(false)
    console.log("get() end")
  }

  function SelectFather() {
    setdisplay(true);
    setlistTitle("Seleccione el tipo de tratamiento");
    setgetF(true);
    setgetP(false);
    setgetS(false);
  }
  function getFather(e) {
    setFather(e)
    setdisplay(false)
    setgetF(false);
    setgetP(false);
    setgetS(false);
  }

  function SelectProcedure() {
    setdisplay(true);
    setlistTitle("Seleccione el tratamiento deseado");
    setgetF(false);
    setgetP(true);
    setgetS(false);
  }
  function getProcedure(e) {
    setprocedure(e)
    setdisplay(false)
    setgetF(false);
    setgetP(false);
    setgetS(false);
  }

  function SelectSede() {
    setdisplay(true);
    setlistTitle("Seleccione una de nuestras sedes");
    setgetF(false);
    setgetP(false);
    setgetS(true);
  }
  function getSede(e) {
    setsede(e);
    setdisplay(false);
    setgetF(false);
    setgetP(false);
    setgetS(false);
  }

  async function AddNewCita() {
    setSendSuccess(true)
    console.log("add new cita")
    let res
    if (itsSelectingHour) {
      const myObj = {
        "id_paciente": user,
        "clinica": sede.id_clinic,
        "fecha": date,
        "time": hour
      }
      await axios.post(base_url(Api, `request/query/revision`), myObj).then(function (response) { res = response.data })
        .catch(function (error) { console.log(error.response.data) })
    }
    else {
      res = await AddCita(user, procedure.id, sede.id)
    }
    if (res) {
      //setSendSuccess(true)
    }
  }




  function goToScreen(screen) {
    setload(true)
    setUser(0)
    setitsSelectingHour(false);
    setquoteExists(false)
    setsedeList(false)
    setsede(false)
    setProcessList([])
    setprocedure(false)
    setgettingDate(false);
    setgettinghour(false);
    setlisthours([]);
    setdate(false);
    sethour(false);
    setFather(false)
    setavailableButton(false)
    setSendSuccess(false)
    setdisplay(false);
    navigation.navigate(screen, { randomCode: Math.random() });
  }




  const FormatHour = (data) => {
    let res
    const hora = data.split(":")[0]
    const minu = data.split(":")[1]
    if (hora >= 12) { res = `${hora - 12}:${minu} PM ` }
    else { res = `${hora}:${minu} AM ` }
    return res
  }


  


    // <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      
      


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>

      
      <ScrollView style={{ backgroundColor: colorBack }}>
        <Head name_user="Registro de citas" />
        {
          load &&
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color={primaryColor} />
        }
        {!load && quoteExists === true &&
          <View style={style.wrap}>
            <View style={{ alignItems: "center", backgroundColor: "#FFF", width: "80%", borderRadius: 20, padding: 20, alignSelf: "center", alignContent: "center" }}>
              <Icon name={'alert-triangle-outline'} width={80} height={80} fill={'orange'} />
              <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: primaryColor, textAlign: "center", }}>¡La solicitud de tu cita esta siendo procesada!</Text>
            </View>
          </View>
        }

        {!load && !quoteExists &&
          <View style={style.wrap}>
            {props.route.params.procedure === 0 && ProcessList !== [] &&
              <View style={[style.group, { borderColor: primaryColor }]}>
                <Text style={[style.text1, { color: primaryColor }]}>Seleccione el tipo de Tratamiento:</Text>
                <TouchableOpacity onPress={() => SelectFather()}>
                  <Text>{Father !== false ? Father.name : "Seleccionar el tipo de tratamiento"}</Text>
                </TouchableOpacity>
              </View>}

            {Father !== false &&
              <TouchableOpacity onPress={() => SelectProcedure()}>
                <View style={[style.group, { borderColor: primaryColor }]}>
                  <Text style={[style.text1, { color: primaryColor }]}>Seleccione el Tratamiento:</Text>
                  <Text>{procedure !== false ? procedure.name : "Seleccionar el tratamiento"}</Text>
                </View>
              </TouchableOpacity>}

            {props.route.params.procedure !== 0 &&
              <View style={[style.group, { borderColor: primaryColor }]}>
                <Text style={[style.text1, { color: primaryColor }]}>Nombre de Tratamiento:</Text>
                <Text>{procedure !== false ? procedure.name : "Seleccionar el tratamiento"}</Text>
              </View>}

            {procedure != false &&
              <View style={[style.group, { borderColor: primaryColor }]}>
                <Text style={[style.text1, { color: primaryColor }]}>Seleccione una de nuestras sedes:</Text>
                <TouchableOpacity onPress={() => SelectSede()}>
                  <Text>{sede !== false ? sede.name : "Seleccionar la sede"}</Text>
                </TouchableOpacity>
              </View>}

            {sede !== false && itsSelectingHour === true &&
              <View style={[style.group, { borderColor: primaryColor }]}>
                <Text style={[style.text1, { color: primaryColor }]}>Seleccione una fecha para su cita:</Text>
                <TouchableOpacity onPress={() => setgettingDate(true)}>
                  <Text>{date !== false ? date : "Seleccionar fecha"} </Text>
                </TouchableOpacity>
              </View>}


            {date !== false && itsSelectingHour === true &&
              <View style={[style.group, { borderColor: primaryColor }]}>
                <Text style={[style.text1, { color: primaryColor }]}>Seleccione una hora para su cita:</Text>
                <TouchableOpacity onPress={() => setgettinghour(true)}>
                  <Text>{hour ? FormatHour(hour) : 'Seleccionar hora'}</Text>
                </TouchableOpacity>
              </View>}


            {availableButton &&
              <TouchableOpacity onPress={() => AddNewCita()} style={[style.BtnPrimary, { backgroundColor: primaryColor }]}>
                <Icon name='checkmark-circle-2' width={20} height={20} fill={'#fff'} />
                <Text style={[style.loginText, style.textOn]}>Agendar Cita</Text>
              </TouchableOpacity>
            }
          </View>
        }
      </ScrollView>

      <Menu props={{ ...props }} />
      </ImageBackground>
      <Modal animationType="slide" transparent={true} visible={gettinghour}>
        <View style={style.wrapperModal}>
          <View style={style.containerModal}>
            <View style={style.modalHeat}>
              <Text style={{ color: primaryColor, lineHeight: 30, fontSize: 16, fontWeight: "bold" }}>Horas Disponibles</Text>
              <TouchableOpacity onPress={() => setgettinghour(false)} style={{ backgroundColor: "white" }}>
                <Icon name={'close'} width={30} height={30} fill={primaryColor} />
              </TouchableOpacity>
            </View>
            {loadHours && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={primaryColor} />}
            {!loadHours &&
              <>
                {listhours.length > 0 ?
                  <View style={style.modalWrapHours}>
                    {listhours.map((i, key) => {
                      return (
                        <TouchableOpacity key={key} onPress={() => [sethour(i), setgettinghour(false)]}
                          style={style.modalHourBtn}>
                          <Text style={style.modalHourBtnText}>{FormatHour(i)}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                  :
                  <View style={{ paddingVertical: 20 }}>
                    <Text style={style.modalEmpty}>no hay horas disponible para la fecha o la sede seleccionada</Text>
                    <View style={style.modalFoot}>
                      <TouchableOpacity onPress={() => [SelectSede()]} style={style.modalFootBtn}>
                        <Text style={style.modalFootBtnText}>cambiar sede</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => [setgettingDate(true)]} style={style.modalFootBtn}>
                        <Text style={style.modalFootBtnText}>cambiar fecha</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }</>}
          </View>
        </View>
      </Modal>

      <Calendary
        data={date}
        config={config}
        open={gettingDate}
        close={setgettingDate}
        getChange={setdate}
      />

      <Modal animationType="slide" transparent={true} visible={sendSuccess}>
        <View style={style.wrapperModal}>
          <View style={{ ...style.containerModal, alignItems: "center", alignContent: "center" }}>
            <Icon name='checkmark-circle-outline' width={70} height={70} fill={primaryColor} />
            <Text style={{ marginTop: 10, textAlign: "center", }}>Tu solicitud fue enviada satisfactoriamente, nuestro quipo de revisiones se encargara de agendar tu cita, la cual sera confirmada con una notificacion.</Text>
            {/* <TouchableOpacity style={{ width: "60%", borderRadius: 10, marginTop: 20, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: primaryColor }} onPress={() => goToScreen('Dashboard')}>
              <Text style={{ color: "#FFF", textAlign: "center", fontSize: 19 }}>INICIO</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={display}>
        <View style={style.wrapperModal}>
          <TouchableOpacity onPress={() => setdisplay(!display)} style={style.btnModal} >
            <Icon name="close-circle-outline" fill={colorLight} width={30} height={30} />
          </TouchableOpacity>
          <View style={style.containerModal}>
            <Text style={style.titleModal}>{listTitle}</Text>
            {!load &&
              <ScrollView>
                {getF &&
                  ProcessList.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => getFather(i)} style={style.modalListBtn}>
                        <Text style={style.modalListBtnText}>{i.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }

                {getP &&
                  Father.child.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => getProcedure(i)} style={style.modalListBtn}>
                        <Text style={style.modalListBtnText}>{i.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }

                {getS === true &&
                  sedeList.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => getSede(i)} style={style.modalListBtn}>
                        <Text style={style.modalListBtnText}>{i.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            }
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  wrapperModal: {
    position: "absolute",
    zIndex: 999,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  btnModal: {
    position: "absolute",
    top: 20,
    right: 20
  },
  containerModal: {
    backgroundColor: colorLight,
    padding: 15,
    borderRadius: 12,
    width: "90%",
    overflow: "hidden",
    maxHeight: "90%"
  },
  titleModal: {
    textAlign: "center",
    width: "100%",
    color: primaryColor,
    fontSize: 20,
    fontWeight: "bold"
  },
  modalHeat: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomColor: "silver",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
  },
  modalListBtn: {
    padding: 15,
    borderBottomColor: "silver",
    borderBottomWidth: 1
  },
  modalListBtnText: {
    textAlign: "center",
    width: "100%",
    fontSize: 14,
    fontWeight: "bold"
  },
  modalFoot: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  modalFootBtn: {
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  modalFootBtnText: {
    color: primaryColor,
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: 14
  },
  modalEmpty: {
    width: "90%",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColor,
    textTransform: "uppercase",
    textAlign: "center"
  },
  modalWrapHours: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  modalHourBtn: {
    borderColor: "silver",
    borderWidth: 0.5,
    borderRadius: 8,
    width: "30%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5
  },
  modalHourBtnText: {},
  wrap: {
    padding: 3,
    paddingHorizontal: 20,
    marginTop: 40,
    margin: "4%",
    width: "90%",
    borderRadius: 15,
    textAlign: 'justify',
    color: "#555"
  },
  group: {
    flexDirection: "column",
    marginBottom: 20,
    borderBottomWidth: 0.5,
  },
  text1: {
    fontWeight: "bold"
  },
  text2: {
    fontSize: 15,
    marginTop: 10, marginBottom: 10
  },
  BtnPrimary: {
    flexDirection: "row",
    margin: "5%",
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  textOn: {
    color: "#FFF"
  },
  textOff: {
    color: "#555"
  },
  loginText: {
    fontSize: 16,
    marginLeft: 20,
  },
});
export default NewCita;



