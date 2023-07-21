import axios from 'axios';

const buildClient = ({req}) => {
    //this is to check if we are on the server or the browser
    //window object is only available on the browser. if it is undefined then it implies that we are on the server
    if(typeof window === 'undefined'){
        console.log(req.headers);
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    }
    else {
        return axios.create({
            baseURL: '/'
        });
    }
};

export default buildClient;