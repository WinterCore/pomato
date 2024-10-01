import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./index.css";

@customElement("app-main")
export class AppMain extends LitElement {
    static styles = css`
        :host h1 {
            font-size: 14px;
            color: red;
        }
    `;

    render() {
        return html`
            <h1 class="text-sm font-bold">Hello, world</h1>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "app-main": AppMain
    }
}
