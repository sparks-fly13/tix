import axios from "axios";
import {useState} from "react";

const useRequest = ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try{
            setErrors([]);
            const response = await axios[method](url, body);

            if(onSuccess){
                onSuccess(response.data);
            }
            return response.data;
        }
        catch(err){
            setErrors(
                err.response.data.errors.map((err) => {
                return <div className="alert alert-danger">
                    <h3>OwO?!!</h3>
                    <div className="my-0" key={err.message}>
                        {err.message}
                    </div>
                    </div>
                })
            );
        }
    }

    return {doRequest, errors};
}

export default useRequest;