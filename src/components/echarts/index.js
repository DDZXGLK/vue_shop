import Radar from "./Radar"
import Pie from "./Pie"
import Bar from "./Bar"

export default {
  install(Vue) {
    Vue.component("Radar", Radar)
    Vue.component("Pie", Pie)
    Vue.component("Bar", Bar)
  }
}