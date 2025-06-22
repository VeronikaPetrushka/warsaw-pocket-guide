import Warsawcomppocket from "./Warsawcomppocket";
import warsawcomps from "../warsawimprtsguide/warsawcomps";

export const WarsawsightsRoute = () => {
    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawsights />}
            showPanel
        />
    )
};


export const WarsawdiscountinfoRoute = ({ route }) => {
    const { discount } = route.params;

    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawdiscountinfo discount={discount} />}
        />
    )
};


export const WarsawfavouritesguideRoute = () => {
    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawfavouritesguide />}
        />
    )
};


export const WarsawlearnRoute = () => {
    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawlearn />}
            showPanel
        />
    )
};


export const WarsawloaderguideRoute = () => {
    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawloaderguide />}
        />
    )
};


export const WarsawnewplaceRoute = ({ route }) => {
    const { place } = route.params || {};

    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawnewplace place={place} />}
        />
    )
};


export const WarsawprofileguideRoute = () => {
    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawprofileguide />}
            showPanel
        />
    )
};


export const WarsawsightinfoRoute = ({ route }) => {
    const { sight } = route.params;

    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawsightinfo sight={sight} />}
        />
    )
};


export const WarsawstudywordsRoute = ({ route }) => {
    const { complexity, award, words } = route.params;

    return (
        <Warsawcomppocket
            children={
                <warsawcomps.Warsawstudywords
                    complexity={complexity}
                    award={award}
                    words={words}
                />
            }
        />
    )
};


export const WarsawtestswordsRoute = ({ route }) => {
    const { complexity, award, words } = route.params;

    return (
        <Warsawcomppocket
            children={
                <warsawcomps.Warsawtestswords
                    complexity={complexity}
                    award={award}
                    words={words}
                />
            }
        />
    )
};


export const WarsawdiscountsRoute = () => {
    return (
        <Warsawcomppocket
            children={<warsawcomps.Warsawdiscounts />}
            showPanel
        />
    )
};