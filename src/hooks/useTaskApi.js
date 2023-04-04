import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://noco-db-production-30af.up.railway.app/api/";


const moonbaseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'xc-auth': 'b_tx5wHo3gOmDdwm9UTKh-ny8TvVsDNLBDlqKLqc',
    'xc-token': 'b_tx5wHo3gOmDdwm9UTKh-ny8TvVsDNLBDlqKLqc'
  }
});
/*
* borrowing messages get/post resquests and modifying it to fit tasks table
* sneaking in a shoutout to @psyferpunk here btw! ;)
*/
export const useGetTasks = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getAxios = useCallback(async () => {
    setLoading(true);
    try {
  const result = await moonbaseAxios.get('/v1/db/data/noco/p_srgdu1r1f0optj/Tasks/views/Tasks', { offset: '0', limit: '25', where: '' });
      setLoading(false);
      setData(result.data);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    getAxios();
  }, []);
  return { loading, data, getAxios };
}

export const usePostTask = () => {
  const postAxios = useCallback(async (data) => {
    try {
      await moonbaseAxios.post('v1/db/data/noco/p_srgdu1r1f0optj/Tasks/views/Tasks', data);
    } catch (err) {
      console.log("err", err);
    }
  }, []);
  return { postAxios };
}