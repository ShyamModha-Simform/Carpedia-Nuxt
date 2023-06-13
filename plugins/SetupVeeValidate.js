import { configure, defineRule } from "vee-validate";
import {
    required,
    integer,
    min,
    max,
    alpha_spaces,
    url,
    email,
    regex,
    confirmed,
    min_value,
    max_value,
} from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
    // options are also accesible to setup default configuration

    defineRule("required", required);
    defineRule("integer", integer);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alpha_spaces);
    defineRule("url", url);
    defineRule("email", email);
    defineRule("regex", regex);
    defineRule("confirmed", confirmed);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);

    configure({
        bails: false,
        generateMessage: (ctx) => {
            const messages = {
                required: `This field should not be empty`,
                integer: `This field should contain only Integer`,
                min: `This field should contain minimum ${ctx.rule.params} characters`,
                max: `This field should not contain more than ${ctx.rule.params} characters`,
                alpha_spaces: `This field should only contain alphabatic characters`,
                url: `This field must contain URL`,
                email: `Enter Valid Email Address`,
                regex: `Password Must contain atleast 1 numeric digit and 1 special character`,
                confirmed: `Password doesn't match. Enter same password`,
                max_value: `Date should be less than ${ctx.rule.params}`,
                min_value: `Date should be more than ${ctx.rule.params}`,
            };

            const message = messages[ctx.rule.name]
                ? messages[ctx.rule.name]
                : "This field is not valid";

            return message;
        },
    });
});
