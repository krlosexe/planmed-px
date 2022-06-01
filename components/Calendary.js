import React, { useState, useEffect } from 'react'
import { Modal, StatusBar, SafeAreaView, Dimensions, ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ShadowPropTypesIOS } from 'react-native'
import { color_fifth, color_grey_light } from '../../styles/Colors';
import Toast from 'react-native-simple-toast';
import _, { cloneWith } from 'lodash'
import { Icon } from 'react-native-eva-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const celda = windowWidth / 10

function zfill(number, width) {
  var numberOutput = Math.abs(number);
  var length = number.toString().length;
  var zero = "0";
  if (width <= length) {
    if (number < 0) {
      return ("-" + numberOutput.toString());
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
    } else {
      return ((zero.repeat(width - length)) + numberOutput.toString());
    }
  }
}

function Calendary(props) {
  const color = props.config.color

  let colorWrap, colorText
  if (props.config.theme === "" || props.config.theme === "light") {
    colorWrap = "white"
    colorText = "#111"
  }
  else {
    colorWrap = "#1C2833"
    colorText = "white"
  }

  const [date, setdate] = useState(props.data);

  useEffect(() => {
    if (date === false) {
      const y = toDay.getFullYear()
      const m = toDay.getMonth() + 1
      const d = toDay.getDate()
      const hoy = `${y}-${m}-${d}`
      setdate(hoy)
    }
  }, [date]);

  //its open select year
  const [selectYearDirectly, setselectYearDirectly] = useState(false);

  //its open select month
  const [selectMonthDirectly, setselectMonthDirectly] = useState(false);

  //courrent time it's today
  const toDay = new Date();

  //año actual, por defecto
  const yearCurrent = { value: toDay.getFullYear(), leap: YEARLEAPER(toDay.getFullYear()) }

  //año seleccionado
  const [yearSelected, setyearSelected] = useState({ leap: false, value: 0 });

  //calcular año bisiesto
  function YEARLEAPER(y) {
    let status
    // Si el año es uniformemente divisible por 4, vaya al paso 2. De lo contrario, vaya al paso 5.
    // Si el año es uniformemente divisible por 100, vaya al paso 3. De lo contrario, vaya al paso 4.
    // Si el año es uniformemente divisible por 400, vaya al paso 4. De lo contrario, vaya al paso 5.
    // El año es un año bisiesto (tiene 366 días).
    // El año no es un año bisiesto (tiene 365 días).
    if (Number.isInteger(y / 4)) { status = true }
    else {
      if (Number.isInteger(y / 100)) { status = true }
      else {
        if (Number.isInteger(y / 400)) { status = true }
        else {
          status = false
        }
      }
    }
    return status
  }

  //lista de meses con sus nombres y cantidad de dias
  const monthList = [
    { 'id': 0, 'name': 'enero', days: 31 },
    { 'id': 1, 'name': 'febrero', days: 28 },
    { 'id': 2, 'name': 'marzo', days: 31 },
    { 'id': 3, 'name': 'abril', days: 30 },
    { 'id': 4, 'name': 'mayo', days: 31 },
    { 'id': 5, 'name': 'junio', days: 30 },
    { 'id': 6, 'name': 'julio', days: 31 },
    { 'id': 7, 'name': 'agosto', days: 31 },
    { 'id': 8, 'name': 'septiembre', days: 30 },
    { 'id': 9, 'name': 'octubre', days: 31 },
    { 'id': 10, 'name': 'noviembre', days: 30 },
    { 'id': 11, 'name': 'diciembre', days: 31 }
  ];

  // mes seleccioando
  const [monthSelected, setmonthSelected] = useState({ id: 0, name: "", daysTotal: "", dayInitName: "", dayInitNumber: 0, dayInitPosition: 0 });
  // lista de los dias del mes seccionado
  const [monthSelectedDaysList, setmonthSelectedDaysList] = useState([]);

  //al iniciar el componente
  useEffect(() => {
    // año seleccionado sera igual al año actual
    setyearSelected(yearCurrent)
    //construir el mes segun el mes actual
    setmonthSelected(buildMonthCurrent(toDay.getMonth()))
    // setdayInit(props.init)
    // setdayEnd(props.end)
  }, [props.open]);

  //construir el mes por defecto
  function buildMonthCurrent(m) {
    let data = {
      id: m,
      name: monthList[m].name,
      daysTotal: monthList[m].days,
      dayInitName: "mon",
      dayInitNumber: 34,
      dayInitPosition: 0
    }
    return data
  }

  // construir el mes a partir del mes seleccionado
  useEffect(() => {
    builderMonth()
  }, [monthSelected]);

  // construir el mes
  async function builderMonth() {
    let totalDays = monthSelected.daysTotal
    //si el año seleccionado es bisiesto y el mes seleccionado es febreo entonces la lista de dias aumentará a 29
    if (yearSelected.leap === true && monthSelected.id === 1) {
      totalDays = 29
    }
    let array = []
    for (var i = 1; i < totalDays + 1; i++) {
      let obj = {
        date: yearSelected.value + "-" + zfill(monthSelected.id + 1, 2) + "-" + zfill(i, 2)
      }
      array.push(obj)
    }
    setmonthSelectedDaysList([...array])
  }

  //cambiar de mes y año segun corresponda
  function changeMonth(v) {
    const id = monthSelected.id
    const mes = id + v
    if (mes === -1) {
      setyearSelected({ value: yearSelected.value - 1, leap: YEARLEAPER(yearSelected.value - 1) })
      const res = buildMonthCurrent(11)
      setmonthSelected(buildMonthCurrent(11))
    }
    else {
      if (mes === 12) {
        setyearSelected({ value: yearSelected.value + 1, leap: YEARLEAPER(yearSelected.value + 1) })
        const res = buildMonthCurrent(0)
        setmonthSelected(buildMonthCurrent(0))
      }
      else {
        setmonthSelected(buildMonthCurrent(mes))
      }
    }
  }

  function selectYear(v) {
    const value = yearSelected.value + v
    const newYear = {
      value: value,
      leap: YEARLEAPER(value)
    }
    setyearSelected(newYear)
    builderMonth()
  }

  function getDay(day) {
    setdate(day)
  }

  function send() {
    props.close(false)
    props.getChange(date)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.open}>
      <View style={styles.wrap}>
        {selectYearDirectly &&
          <View style={styles.wrapDirectly}>
            <View style={{ backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 12, padding: 5, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => selectYear(-1)}>
                  <Icon name={"minus-outline"} width={25} height={25} fill={"silver"} />
                </TouchableOpacity>
                <Text style={{
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderRadius: 12,
                  lineHeight: 25,
                  paddingHorizontal: 40,
                  fontWeight: "bold",
                  fontSize: 14,
                  marginHorizontal: 10
                }}>{yearSelected.value}</Text>
                <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => selectYear(+1)}>
                  <Icon name={"plus-outline"} width={25} height={25} fill={"silver"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ marginLeft: 15, width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => setselectYearDirectly(false)}>
                <Icon name={"close"} width={25} height={25} fill={"silver"} />
              </TouchableOpacity>
            </View>
          </View>
        }
        {selectMonthDirectly &&
          <View style={styles.wrapDirectly}>
            <TouchableOpacity
              onPress={() => setselectMonthDirectly(false)}
              style={{
                backgroundColor: "silver",
                borderWidth: 2,
                borderColor: "white",
                width: 30,
                height: 30,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: -5,
                right: -5,
                zIndex: 999,
              }}>
              <Icon name={"close"} width={25} height={25} fill={"white"} />
            </TouchableOpacity>
            {monthList.map((i, key) => {
              return (
                <TouchableOpacity
                  onPress={() => [setmonthSelected(buildMonthCurrent(i.id)), setselectMonthDirectly(false)]}
                  style={{
                    width: celda * 2.7,
                    backgroundColor: monthSelected.id === i.id ? "white" : "rgba(255,255,255,0.25)",
                    marginHorizontal: 2,
                    marginVertical: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    borderRadius: 8
                  }}
                  key={key}>
                  <Text style={{
                    color: monthSelected.id === i.id ? props.color : "#1C2833",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}>{i.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        }
        <View style={{ backgroundColor: colorWrap, width: celda * 9, borderRadius: 12, overflow: "hidden" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={{ width: celda, height: celda, justifyContent: "center", alignItems: "center" }}>
              <Icon name="arrow-left" width={20} height={20} fill={"silver"} />
            </TouchableOpacity>
            <View style={{ width: celda * 7, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setselectYearDirectly(!selectYearDirectly)}>
                <Text style={{ color: colorText, marginLeft: 5, fontWeight: "bold" }}>{yearSelected.value}.</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setselectMonthDirectly(selectMonthDirectly)}>
                <Text style={{ color: colorText, marginLeft: 5, textTransform: "capitalize", fontWeight: "bold" }}>{monthSelected.name}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => changeMonth(+1)} style={{ width: celda, height: celda, justifyContent: "center", alignItems: "center" }}>
              <Icon name="arrow-right" width={20} height={20} fill={"silver"} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <Text style={styles.nameDay}>Dom</Text>
              <Text style={styles.nameDay}>Lun</Text>
              <Text style={styles.nameDay}>Mar</Text>
              <Text style={styles.nameDay}>Mié</Text>
              <Text style={styles.nameDay}>Jue</Text>
              <Text style={styles.nameDay}>Vie</Text>
              <Text style={styles.nameDay}>Sáb</Text>
            </View>
            {monthSelectedDaysList.length !== 0 && monthSelectedDaysList.map((i, key) => {
              return (
                <DAY
                  key={key}
                  value={i}
                  date={date}
                  color={color}
                  getDay={getDay}
                  toDay={toDay}
                  minDateNow={props.config.minDateNow}
                />
              )
            })}
            <View style={styles.wrapperFoot}>
              <TouchableOpacity style={{ ...styles.wrapperFootBtnCancel, borderColor: color }} onPress={() => props.close(false)}>
                <Text style={{ ...styles.wrapperFootBtnCancelText, color: color }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.wrapperFootBtnAccept, backgroundColor: color }} onPress={() => send()}>
                <Text style={{ ...styles.wrapperFootBtnAcceptText, }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
export default React.memo(Calendary);

const DAY = (props) => {
  const day = props.value.date.split("-")[2]

  function itsActive() {
    let res = false
    if (props.date !== null) {
      const select = props.date.split("-")[2]
      if (day === select) { res = true }
    }
    return res
  }

  function _position(p) {
    let res = 0
    if (p === "01") {
      var DAY = new Date(props.value.date);
      const first = DAY.getDay() + 1
      if (first === 7) {
        res = 0
      }
      else {
        res = first
      }
    }
    return res;
  }

  function check(day) {
    const toDay = new Date();
    const Y = toDay.getFullYear()
    const M = zfill(toDay.getMonth() + 1, 2)
    const D = zfill(toDay.getDate(), 2)
    const today = Y + "-" + M + "-" + D
    if (props.minDateNow === true) {
      if (day >= today) {
        props.getDay(day)
      }
      else {
        Toast.show(`minimum day ${D}`)
      }
    }
    else {
      props.getDay(day)
    }
  }
  let active = itsActive()
  let position = _position(day);
  return (
    <TouchableOpacity onPress={() => check(props.value.date)}
      style={{
        margin: 1, justifyContent: "center", alignItems: "center",
        borderRadius: celda, width: celda, height: celda,
        backgroundColor: active ? props.color : "white",
        marginLeft: (celda * position) + 1
      }}>
      <Text style={{ fontSize: 14, color: active === true ? "white" : "silver" }}>{day}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapDirectly: {
    backgroundColor: "silver",
    width: celda * 9,
    marginBottom: -20,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingBottom: 30,
    paddingTop: 10,
    alignSelf: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrap: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: celda * 7.7,
    alignSelf: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF"
  },
  nameDay: {
    margin: 1,
    textAlign: "center",
    width: celda
  },
  wrapperFoot: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  wrapperFootBtnCancel: {
    borderRadius: 12,
    paddingVertical: 5,
    width: celda * 2.5,
    borderWidth: 1
  },
  wrapperFootBtnCancelText: {
    textAlign: "center",
  },
  wrapperFootBtnAccept: {
    borderRadius: 12,
    paddingVertical: 5,
    width: celda * 4,
  },
  wrapperFootBtnAcceptText: {
    textAlign: "center",
    color: "white"
  }
})