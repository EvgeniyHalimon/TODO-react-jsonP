import { Fetch } from '../utils/Fetch';
import { setData, setActivePage } from './actions';

export const getThunkPosts = (id, page, limit) => {
    return (dispatch) => {
        Fetch.get(`posts?userId=${id}&_page=${page}&_limit=${limit}&_sort=date,time&_order=desc,desc`).then(res => {
            dispatch(setData(res.data))
            dispatch(setActivePage(page))
        })
    }
}