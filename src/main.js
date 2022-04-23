import Init from "./template/init.js";
import Component from "./core/Component.js";

class VendingMachine extends Component {
    template() {
        return Init();
    }

    bindEvent() {
        // dom 잡기
    }
}

new VendingMachine(document.getElementById("app"));
