import React, { useState } from "react";
import InputNumber from "./ui/form-control/input-number";
import Select from "./ui/form-control/select/select";
import Container from "./ui/common/container";
import { useForm } from "react-hook-form";

const shippingModeOptions = [
  { value: "Express (12-18 дней)", label: "Express (12-18 дней)" },
  { value: "Standard (25-30 дней)", label: "Standard (25-30 дней)" },
];

const goodsTypeOptions = [
  { value: "package", label: "Standard Package" },
  { value: "document", label: "Documents" },
  { value: "pallet", label: "Pallet" },
];

// const fromCityOptions = [
//   { value: "Beijing", label: "Beijing" },
//   { value: "Guangzhou", label: "Guangzhou" },
//   { value: "Hangzhou", label: "Hangzhou" },
//   { value: "Shanghai", label: "Shanghai" },
//   { value: "Shenzhen", label: "Shenzhen" },
//   { value: "Suzhou", label: "Suzhou" },
//   { value: "Tianjin", label: "Tianjin" },
// ];

// const toCityOptions = [
//   { value: "Moscow", label: "Moscow" },
//   { value: "St. Petersburg", label: "St. Petersburg" },
//   { value: "Yakterinburg", label: "Yakterinburg" },
//   { value: "Samara", label: "Samara" },
//   { value: "Saratov", label: "Saratov" },
// ];

const ShippingCalculator = () => {
  const [price, setPrice] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [shippingMode, setShippingMode] = useState(shippingModeOptions[0]);
  const [goodsType, setGoodsType] = useState(goodsTypeOptions[0]);

  // const [fromCity, setFromCity] = useState(fromCityOptions[1]);
  // const [toCity, setToCity] = useState(toCityOptions[0]);
  const [formData, setFormData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const [data, setData] = useState({
    weight: "",
    price: "",
    cubemtr: "",
    density: "",
    productcost: "",
    cost: "",
    pkgprice: "",
    insurance: "",
    packaging: "",
    unloading: "",
    totalcost: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDensity = () => {
    let wt = parseFloat(formData.weight);
    let len = parseFloat(formData.length) / 100;
    let wid = parseFloat(formData.width) / 100;
    let ht = parseFloat(formData.height) / 100;
    let cubemtr = parseFloat(len * wid * ht);
    let density = parseFloat(wt / cubemtr);
    return density.toFixed(2);
  };

  const priceRate = (den) => {
    return new Promise((resolve, reject) => {
      let price = 0;
      switch (true) {
        case den >= 1 && den <= 100:
          price = (230 / cubemtr).toFixed(2);
          break;
        case den >= 101 && den <= 110:
          price = 2.5;
          break;
        case den >= 111 && den <= 120:
          price = 2.4;
          break;
        case den >= 121 && den <= 130:
          price = 2.3;
          break;
        case den >= 131 && den <= 140:
          price = 2.2;
          break;
        case den >= 141 && den <= 150:
          price = 2.1;
          break;
        case den >= 151 && den <= 160:
          price = 2;
          break;
        case den >= 161 && den <= 170:
          price = 1.9;
          break;
        case den >= 171 && den <= 180:
          price = 1.8;
          break;
        case den >= 181 && den <= 190:
          price = 1.7;
          break;
        case den >= 191 && den <= 200:
          price = 1.6;
          break;
        case den >= 201 && den <= 250:
          price(1.5);
          break;
        case den >= 151 && den <= 300:
          price = 1.4;
          break;
        case den >= 301 && den <= 350:
          price = 1.3;
          break;
        case den >= 151 && den <= 400:
          price = 1.2;
          break;
        case den >= 141 && den <= 100000:
          price = 1.1;
          break;
        default:
          alert("oops something went wrong !");
      }
      resolve(price);
    });
  };

  async function onSubmit({
    weight,
    length,
    width,
    height,
    packaging,
    productcost,
    unloading,
  }) {
    setProcessing(true);
    let wt = parseFloat(weight);
    let pkg = parseFloat(packaging);
    let prodcost = parseFloat(productcost);
    let unload = parseFloat(unloading);
    let len = parseFloat(length) / 100;
    let wid = parseFloat(width) / 100;
    let ht = parseFloat(height) / 100;
    let cubemtr = parseFloat(len * wid * ht);
    let density = parseFloat(wt / cubemtr);
    let price = await priceRate(density);

    let cost = parseFloat(wt * price).toFixed(2);
    let pktCost = parseFloat(pkg * cubemtr).toFixed(2);
    let insurance = parseFloat((prodcost / 100) * 1).toFixed(2);
    const totalCost =
      parseFloat(cost) +
      parseFloat(pktCost) +
      parseFloat(insurance) +
      parseFloat(unload);

    setData({
      weight: wt,
      price: price,
      cubemtr: cubemtr.toFixed(2),
      productcost: prodcost,
      density: density.toFixed(2),
      cost: cost,
      insurance: insurance,
      pkgprice: pkg,
      packaging: pktCost,
      unloading: unload,
      totalcost: totalCost.toFixed(2),
    });
    setProcessing(false);
  }

  return (
    <Container className="my-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full ">
        <div className="grid grid-cols-12 md:gap-4">
          {/* <Select
            name="fromcity"
            className="col-span-7 md:col-span-6 mb-3"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            text="От (Город)"
            defaultValue={fromCity}
            options={fromCityOptions}
            isSearchable={false}
            onChange={(value) => setEducation(value)}
          />
          <InputText
            className="relative col-span-5 md:col-span-6 mb-2 ml-1"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[68px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Пин-код"
          />
          <Select
            name="tocity"
            className="col-span-7 md:col-span-6 mb-3"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            text="До (Город)"
            defaultValue={toCity}
            options={toCityOptions}
            isSearchable={false}
            onChange={(value) => setEducation(value)}
          />
          <InputText
            className="col-span-5 md:col-span-6 mb-3 ml-1"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[68px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Пин-код"
          /> */}

          <InputNumber
            name="weight"
            className="col-span-12 md:col-span-12 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="grow border border-solid border-orange-500 text-[14px] md:text-base"
            text="Вес (кг.)"
            {...register("weight", {
              required: "weight is required ! ",
            })}
            error={errors.weight?.message}
            onChange={handleChange}
          />

          <div className="col-span-6 md:col-span-6  pb-1.5">
            <label className="font-medium text-[16px] md:text-base ">
              Размеры (Д×Ш×В) см
            </label>
          </div>
          <div className="col-span-6 md:col-span-6  pb-1.5">
            {!isNaN(calculateDensity()) && (
              <div className="flex justify-end">
                <p className="font-medium text-[16px] md:text-base text-end  text-amber-900">
                  Плотность
                </p>
                <p className="pl-2 font-semibold text-[16px] md:text-base text-end text-amber-800 ">
                  {calculateDensity()}{" "}
                </p>
              </div>
            )}
          </div>

          <InputNumber
            name="length"
            className="col-span-4 md:col-span-4 mb-3 "
            inputClassName="w-full border border-e-0 md:border-e-1 md:border-e-none border-solid border-orange-500 text-[14px] md:text-base"
            placeholder="Длина"
            {...register("length", {
              required: "required ! ",
            })}
            error={errors.length?.message}
            onChange={handleChange}
          />

          <InputNumber
            name="width"
            className="col-span-4 md:col-span-4 mb-3 "
            inputClassName="w-full border border-e-0 md:border-e-1 border-solid border-orange-500 text-[14px] md:text-base"
            placeholder="Ширина"
            {...register("width", {
              required: "required ! ",
            })}
            error={errors.width?.message}
            onChange={handleChange}
          />
          <InputNumber
            name="height"
            className="col-span-4 md:col-span-4 mb-3 "
            inputClassName="w-full border border-solid border-orange-500 text-[14px] md:text-base"
            placeholder="Высота"
            {...register("height", {
              required: "required ! ",
            })}
            error={errors.height?.message}
            onChange={handleChange}
          />

          {/* <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="grow border border-solid border-orange-500 text-[14px] md:text-base"
            text="Цена за кг ($)"
            {...register("price", {
              required: "required ! ",
            })}
            error={errors.price?.message}
          /> */}
          <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="grow border border-solid border-orange-500 text-[14px] md:text-base"
            text="Объем в m³"
            {...register("packaging", {
              required: "required ! ",
            })}
            error={errors.packaging?.message}
          />
          <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="grow border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[96px] md:w-full border border-solid border-orange-500 text-[14px] md:text-base"
            text="Объявленная стоимость груза ($)"
            {...register("productcost", {
              required: "required ! ",
            })}
            error={errors.productcost?.message}
          />
          <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="grow border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[144px] md:w-full border border-solid border-orange-500 text-[14px] md:text-base"
            text="Разгрузка 1 место ($)"
            {...register("unloading", {
              required: "required ! ",
            })}
            error={errors.unloading?.message}
          />

          {/* <InputNumber
            className="col-span-6 md:col-span-6 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[76px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Длина (мм)"
          />
          <InputNumber
            className="col-span-6 md:col-span-6 mb-3 ml-1"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[64px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Ширина (мм)"
          />
          <InputNumber
            className="col-span-6 md:col-span-6 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[68px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Высота (мм)"
          /> */}
          {/* <InputNumber
            className="col-span-6 md:col-span-6 mb-3 ml-1"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[68px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Масса (кг.)"
          /> */}
          <Select
            name="goods"
            className="col-span-12 md:col-span-6 mb-3"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            text="Вид груза (характер)"
            defaultValue={goodsType}
            options={goodsTypeOptions}
            isSearchable={false}
            onChange={(value) => setGoodsType(value)}
          />
          <Select
            name="shipping"
            className="col-span-12 md:col-span-6 mb-3"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            text="Способ доставки"
            defaultValue={shippingMode}
            options={shippingModeOptions}
            isSearchable={false}
            onChange={(value) => setShippingMode(value)}
          />
        </div>

        {/* {density && (
          <div className="col-span-12 md:col-span-12  pb-1.5">
            <label className="font-medium text-[16px] md:text-base ">
              {density}
            </label>
          </div>
        )} */}

        <div className="relative">
          {processing ? (
            <button
              type="button"
              className="uppercase inline-flex items-center justify-center w-full py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90 cursor-not-allowed"
              disabled
            >
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="ml-4">Рассчит...</span>
            </button>
          ) : (
            <button
              type="submit"
              className="uppercase inline-flex items-center justify-center w-full py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90 cursor"
            >
              Рассчитать
            </button>
          )}

          {/* <button
            type="submit"
            className="uppercase inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
          >
            {processing ? " " : "Рассчитать"}
          </button> */}
        </div>
      </form>
      {data.totalcost && (
        <div className="shadow-md rounded mt-4 bg-amber-50 p-4">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="font-medium uppercase text-xs">Цена</td>
                <td className="text-xs font-normal">
                  {data.weight} X {data.price}$
                </td>
                <td className="text-right font-semibold text-[18px]">
                  {data.cost}$
                </td>
              </tr>
              <tr>
                <td className="font-medium uppercase text-xs">Упаковка</td>
                <td className="text-xs font-normal">
                  {data.pkgprice} X {data.cubemtr} m³
                </td>
                <td className="text-right font-semibold text-[18px]">
                  {data.packaging}$
                </td>
              </tr>
              <tr>
                <td className="font-medium uppercase text-xs">Страховка</td>
                <td className="text-xs font-normal">
                  1 % of {data.productcost}$
                </td>
                <td className="text-right font-semibold text-[18px]">
                  {data.insurance}$
                </td>
              </tr>
              <tr>
                <td className="font-medium uppercase text-xs">Разгрузка </td>
                <td></td>
                <td className="text-right font-semibold text-[18px]">
                  {data.unloading}$
                </td>
              </tr>
              <tr>
                <td className="uppercase font-semibold text-xs">
                  Общая стоимость
                </td>
                <td></td>
                <td className="text-right font-semibold text-[20px]">
                  {data.totalcost}$
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default ShippingCalculator;
