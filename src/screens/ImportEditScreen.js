import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsImport, updateImport } from '../actions/importActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { IMPORT_UPDATE_RESET } from '../constants/importConstants';

// import { Container } from './styles';

function ImportEditScreen(props) {
    const history = useHistory();
    const importId = props.match.params.id;

    const [urgent_level, setUrgent_level] = useState('');
    const [import_date, setImport_date] = useState('');
    const [state, setState] = useState('');
    const [bonus, setBonus] = useState('');
    const [requesterId, setRequesterId] = useState('');
    const [executorId, setExecutorId] = useState('');
    const [checkerId, setCheckerId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [importProducts, setImportProducts] = useState([]);
    const [productId, setProductId] = useState([]);
    const [request_total_unit, setRequest_total_unit] = useState([]);
    const [real_total_unit, setReal_total_unit] = useState([]);
    const [expires, setExpires] = useState([]);
    const [unit_name, setUnit_name] = useState([]);
    const [conversionRate, setConversionRate] = useState([]);
    const [import_price_unit, setImport_price_unit] = useState([]);


    const importDetails = useSelector((state) => state.importDetails);
    const { loading, error, _import } = importDetails;

    const importUpdate = useSelector((state) => state.importUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = importUpdate;

    const dispatch = useDispatch();

    console.log(importDetails);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: IMPORT_UPDATE_RESET });
            props.history.push('/imports');
        }
        if (!_import || _import.ShID !== importId) {
            dispatch({ type: IMPORT_UPDATE_RESET });
            dispatch(detailsImport(importId));
        }
        dispatch({ type: IMPORT_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setUrgent_level(_import.urgent_level);
            setImport_date(new Date(_import.import_date).toISOString().slice(0, 10));
            setState(_import.state);
            setBonus(_import.bonus);
            setRequesterId(_import.requesterId);
            setExecutorId(_import.executorId);
            setCheckerId(_import.checkerId);
            setSupplierId(_import.supplierId);
            setSupplierId(_import.supplierId);
            setImportProducts(_import.products);
            var arr = [];
            var brr = [];
            var crr = [];
            var drr = [];
            var err = [];
            var frr = [];
            var grr = [];

            for (let i = 0; i < _import.products.length; i++) {
                arr[i] = _import.products[i].PID;
                brr[i] = _import.products[i].ProductInImport.request_total_unit;
                if (_import.products[i].ProductInImport.real_total_unit) {
                    crr[i] = _import.products[i].ProductInImport.real_total_unit;
                }
                if (_import.products[i].lot) {
                    drr[i] = new Date(_import.products[i].lot.expires).toISOString().slice(0, 10);
                    err[i] = _import.products[i].lot.unit_name;
                    frr[i] = _import.products[i].lot.conversionRate;
                    grr[i] = _import.products[i].lot.import_price_unit;
                }
            }
            setProductId(arr);
            setRequest_total_unit(brr);
            setReal_total_unit(crr);
            setExpires(drr);
            setUnit_name(err);
            setConversionRate(frr);
            setImport_price_unit(grr);
        }
    }, [loading,]);


    // console.log(productId);

    const submitHandler = (e) => {
        e.preventDefault();
        for (let i = 0; i < importProducts.length; i++) {
            importProducts[i] = {
                productId: productId[i],
                request_total_unit: request_total_unit[i],
                real_total_unit: real_total_unit[i],
                expires: expires[i],
                unit_name: unit_name[i],
                conversionRate: conversionRate[i],
                import_price_unit: import_price_unit[i],
            };
        }
        dispatch(
            updateImport({
                importId,
                urgent_level,
                import_date,
                state,
                bonus,
                requesterId,
                executorId,
                checkerId,
                supplierId,
                importProducts,
            })
        );
    };

    const changeRequestTotalNumber = (e, index) => {
        let arr = [...request_total_unit];
        arr[index] = parseInt(e.target.value, 10);
        setRequest_total_unit(arr);
    };
    const changeReal_total_unit = (e, index) => {
        let arr = [...real_total_unit];
        arr[index] = parseInt(e.target.value, 10);
        setReal_total_unit(arr);
    };
    const changeExpires = (e, index) => {
        let arr = [...expires];
        arr[index] = e.target.value;
        setExpires(arr);
    };
    const changeUnitName = (e, index) => {
        let arr = [...unit_name];
        arr[index] = e.target.value;
        setUnit_name(arr);
    };
    const changeConvertRate = (e, index) => {
        let arr = [...conversionRate];
        arr[index] = e.target.value;
        setConversionRate(arr);
    };
    const changeImport_price_unit = (e, index) => {
        let arr = [...import_price_unit];
        arr[index] = e.target.value;
        setImport_price_unit(arr);
    };
    // console.log(expires);

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Cập Nhật Đơn Nhập Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                {/* <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    <form onSubmit={submitHandler}>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                                <>
                                                    <div className="form-group">
                                                        <label className="form-label" >độ ưu tiên:</label>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            name="status"
                                                            value={urgent_level}
                                                            onChange={(e) => setUrgent_level(e.target.value)}
                                                        >
                                                            <option value="normal">bình thường</option>
                                                            <option value="prior">ưu tiên</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">ngày nhập hàng:</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="ngày nhập hàng"
                                                            name="import_date"
                                                            value={import_date}
                                                            onChange={(e) => setImport_date(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >tình trạng:</label>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            name="state"
                                                            value={state}
                                                            onChange={(e) => setState(e.target.value)}
                                                        >
                                                            <option value="request">yêu cầu</option>
                                                            <option value="executed">đã thực hiện</option>
                                                            <option value="close">đóng</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">ghi chú:</label>
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder="ghi chú"
                                                            value={bonus}
                                                            onChange={(e) => setBonus(e.target.value)}
                                                        >
                                                        </textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">NV yêu cầu:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhân viên yêu cầu"
                                                            name="requesterId"
                                                            value={requesterId}
                                                            onChange={(e) => setRequesterId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">NV thực hiện:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhân viên thực hiện"
                                                            name="executorId"
                                                            value={executorId}
                                                            onChange={(e) => setExecutorId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">NV kiểm tra:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhân viên kiểm tra"
                                                            name="checkerId"
                                                            value={checkerId}
                                                            onChange={(e) => setCheckerId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">nhà cung cấp:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhà cung cấp"
                                                            name="supplierId"
                                                            value={supplierId}
                                                            onChange={(e) => setSupplierId(e.target.value)}
                                                        />
                                                    </div>
                                                </>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                                <>

                                                    <table className="table table-hover mt15">
                                                        <thead>
                                                            <tr>
                                                                <th className="col-md-1">productId</th>
                                                                <th className="col-md-1">request_total_unit</th>
                                                                <th className="col-md-1">real_total_unit</th>
                                                                <th className="col-md-2">expires</th>
                                                                <th className="col-md-1">unit_name</th>
                                                                <th className="col-md-1">conversionRate</th>
                                                                <th className="col-md-2">import_price_unit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {importProducts.map((product, index) => (
                                                                <tr key={product.PID}>
                                                                    {/* <td>{index + 1}</td> */}
                                                                    <td>
                                                                        <Link to={`/products/${productId[index]}`}>
                                                                            {productId[index]}
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                // placeholder="nhân viên yêu cầu"
                                                                                // name="request_total_unit"
                                                                                value={request_total_unit[index]}
                                                                                onChange={(e) => changeRequestTotalNumber(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                // placeholder="nhân viên yêu cầu"
                                                                                // name="request_total_unit"
                                                                                value={real_total_unit[index]}
                                                                                onChange={(e) => changeReal_total_unit(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                // placeholder="nhân viên yêu cầu"
                                                                                // name="request_total_unit"
                                                                                value={expires[index]}
                                                                                onChange={(e) => changeExpires(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={unit_name[index]}
                                                                                onChange={(e) => changeUnitName(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={conversionRate[index]}
                                                                                onChange={(e) => changeConvertRate(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={import_price_unit[index]}
                                                                                onChange={(e) => changeImport_price_unit(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>



                                                </>
                                            </div>
                                        </div>







                                        <button type="submit" className="btn btn-primary fr">cập nhật đơn nhập hàng</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default ImportEditScreen;



