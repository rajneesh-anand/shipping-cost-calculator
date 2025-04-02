import React, { useState } from "react";
import InputNumber from "./ui/form-control/input-number";
import Select from "./ui/form-control/select/select";
import Container from "./ui/common/container";
import { useForm } from "react-hook-form";
import Spinner from "../components/ui/common/spinner";

const educationOptions = [
  { value: "Express (12-18 дней)", label: "Express (12-18 дней)" },
  { value: "Standard (25-30 дней)", label: "Standard (25-30 дней)" },
];

const fromCityOptions = [
  { value: "Beijing", label: "Beijing" },
  { value: "Guangzhou", label: "Guangzhou" },
  { value: "Hangzhou", label: "Hangzhou" },
  { value: "Shanghai", label: "Shanghai" },
  { value: "Shenzhen", label: "Shenzhen" },
  { value: "Suzhou", label: "Suzhou" },
  { value: "Tianjin", label: "Tianjin" },
];

const toCityOptions = [
  { value: "Moscow", label: "Moscow" },
  { value: "St. Petersburg", label: "St. Petersburg" },
  { value: "Yakterinburg", label: "Yakterinburg" },
  { value: "Samara", label: "Samara" },
  { value: "Saratov", label: "Saratov" },
];

const ShippingCalculator = () => {
  const [processing, setProcessing] = useState(false);
  const [density, setDensity] = useState("");
  const [education, setEducation] = useState(educationOptions[0]);
  const [fromCity, setFromCity] = useState(fromCityOptions[1]);
  const [toCity, setToCity] = useState(toCityOptions[0]);
  // const [formData, setFormData] = useState({
  //   weight: "",
  //   length: "",
  //   width: "",
  //   height: "",
  // });

  const [data, setData] = useState({
    cubemtr: "",
    density: "",
    productcost: "",
    price: "",
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

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const countries = [
    { code: "CN", name: "China" },
    { code: "RU", name: "Russia" },
    { code: "US", name: "United States" },
    { code: "DE", name: "Germany" },
    // Add more countries as needed
  ];

  const shippingMethods = [
    { value: "air", label: "Air Freight" },
    { value: "sea", label: "Sea Freight" },
    { value: "rail", label: "Rail Freight" },
    { value: "express", label: "Express Courier" },
  ];

  const packageTypes = [
    { value: "package", label: "Standard Package" },
    { value: "document", label: "Documents" },
    { value: "pallet", label: "Pallet" },
  ];

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const calculateVolumetricWeight = (length, width, height) => {
  //   return (length * width * height) / 5000; // Standard volumetric divisor for air freight
  // };

  // const calculateShipping = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     // Calculate chargeable weight (greater of actual or volumetric)
  //     const volumetricWeight = calculateVolumetricWeight(
  //       parseFloat(formData.length),
  //       parseFloat(formData.width),
  //       parseFloat(formData.height)
  //     );

  //     const chargeableWeight = Math.max(
  //       parseFloat(formData.weight),
  //       volumetricWeight
  //     );

  //     // In a real app, you would call your backend API here
  //     // This is a mock calculation for demonstration
  //     let cost;
  //     switch (formData.shippingMethod) {
  //       case "air":
  //         cost = chargeableWeight * 4.5; // $4.5/kg for air
  //         break;
  //       case "sea":
  //         cost = chargeableWeight * 0.8; // $0.8/kg for sea
  //         break;
  //       case "rail":
  //         cost = chargeableWeight * 2.5; // $2.5/kg for rail
  //         break;
  //       case "express":
  //         cost = chargeableWeight * 6.0; // $6.0/kg for express
  //         break;
  //       default:
  //         cost = 0;
  //     }

  //     // Add origin-destination specific adjustments
  //     if (
  //       formData.originCountry === "CN" &&
  //       formData.destinationCountry === "RU"
  //     ) {
  //       // Special China-Russia rates
  //       cost *= 0.9; // 10% discount for this route
  //     }

  //     // Simulate API delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     setResult({
  //       cost: cost.toFixed(2),
  //       currency: "USD",
  //       weight: formData.weight,
  //       volumetricWeight: volumetricWeight.toFixed(2),
  //       chargeableWeight: chargeableWeight.toFixed(2),
  //       shippingMethod: shippingMethods.find(
  //         (m) => m.value === formData.shippingMethod
  //       ).label,
  //     });
  //   } catch (err) {
  //     setError("Failed to calculate shipping. Please check your inputs.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   calculateShipping();
  // };

  async function onSubmit({
    weight,
    length,
    width,
    height,
    price,
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
    let prc = parseFloat(price);
    let density = parseFloat(wt / cubemtr);
    let cost = parseFloat(density * prc).toFixed(2);
    let pktCost = parseFloat(pkg * cubemtr).toFixed(2);
    let insurance = parseFloat((prodcost / 100) * 1).toFixed(2);
    let totalCost = parseFloat(cost + pktCost + insurance + unload).toFixed(2);

    setData({
      cubemtr: cubemtr,
      productcost: prodcost,
      density: density,
      price: prc,
      cost: cost,
      insurance: insurance,
      pkgprice: pkg,
      packaging: pktCost,
      unloading: unload,
      totalcost: totalCost,
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
          />

          <div className="col-span-12 md:col-span-12  pb-1.5">
            <label className="font-medium text-[16px] md:text-base ">
              Размеры (Д×Ш×В) см
            </label>
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
          />

          <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="grow border border-solid border-orange-500 text-[14px] md:text-base"
            text="Цена за кг ($)"
            {...register("price", {
              required: "required ! ",
            })}
            error={errors.price?.message}
          />
          <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="grow border border-solid border-orange-500 text-[14px] md:text-base"
            text="Упаковка за m³ ($)"
            {...register("packaging", {
              required: "required ! ",
            })}
            error={errors.packaging?.message}
          />
          <InputNumber
            className="col-span-12 md:col-span-6 mb-3 "
            textSpanClassName="grow border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[136px] md:w-full border border-solid border-orange-500 text-[14px] md:text-base"
            text="Стоимость товара ($)"
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
            name="province"
            className="col-span-12 md:col-span-6 mb-3"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            text="Способ доставки"
            defaultValue={education}
            options={educationOptions}
            isSearchable={false}
            onChange={(value) => setEducation(value)}
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
                <td className="font-medium uppercase">Cost</td>
                <td>
                  {data.density} X {data.price}$
                </td>
                <td className="text-right font-semibold text-[18px]">
                  {data.cost}$
                </td>
              </tr>
              <tr>
                <td className="font-medium uppercase">Packaging</td>
                <td>
                  {data.pkgprice} X {data.cubemtr}
                </td>
                <td className="text-right font-semibold text-[18px]">
                  {data.packaging}$
                </td>
              </tr>
              <tr>
                <td className="font-medium uppercase">Insurance</td>
                <td>1 % of {data.productcost}$</td>
                <td className="text-right font-semibold text-[18px]">
                  {data.insurance}$
                </td>
              </tr>
              <tr>
                <td className="font-medium uppercase">Unloading</td>
                <td></td>
                <td className="text-right font-semibold text-[18px]">
                  {data.unloading}$
                </td>
              </tr>
              <tr>
                <td className="uppercase font-semibold text-[24px]">
                  Total Cost
                </td>
                <td></td>
                <td className="text-right font-semibold text-[24px]">
                  {data.totalcost}$
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Container>
    // <Container fixed>
    //   <form onSubmit={handleSubmit}>
    //     <Grid container spacing={2}>
    //       <Grid size={{ xs: 12, md: 6 }}>
    //         <FormControl fullWidth>
    //           <InputLabel>Origin Country</InputLabel>
    //           <Select
    //             name="originCountry"
    //             value={formData.originCountry}
    //             onChange={handleChange}
    //             label="Origin Country"
    //             required
    //           >
    //             {countries.map((country) => (
    //               <MenuItem key={country.code} value={country.code}>
    //                 {country.name}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Grid>
    //       <Grid size={{ xs: 12, md: 6 }}>
    //         <FormControl fullWidth>
    //           <InputLabel>Destination Country</InputLabel>
    //           <Select
    //             name="destinationCountry"
    //             value={formData.destinationCountry}
    //             onChange={handleChange}
    //             label="Destination Country"
    //             required
    //           >
    //             {countries.map((country) => (
    //               <MenuItem key={country.code} value={country.code}>
    //                 {country.name}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </Container>

    // <Container maxWidth="md" sx={{ mt: 4 }}>
    //   {/* <Paper elevation={3} sx={{ p: 4 }}> */}
    //   <Typography variant="h4" component="h1" gutterBottom>
    //     International Shipping Calculator
    //   </Typography>

    //   <form onSubmit={handleSubmit}>
    //     <Grid container spacing={2}>
    //       <Grid xs={12} sm={12}>
    //         <FormControl fullWidth>
    //           <InputLabel>Origin Country</InputLabel>
    //           <Select
    //             name="originCountry"
    //             value={formData.originCountry}
    //             onChange={handleChange}
    //             label="Origin Country"
    //             required
    //           >
    //             {countries.map((country) => (
    //               <MenuItem key={country.code} value={country.code}>
    //                 {country.name}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <FormControl fullWidth>
    //           <InputLabel>Destination Country</InputLabel>
    //           <Select
    //             name="destinationCountry"
    //             value={formData.destinationCountry}
    //             onChange={handleChange}
    //             label="Destination Country"
    //             required
    //           >
    //             {countries.map((country) => (
    //               <MenuItem key={country.code} value={country.code}>
    //                 {country.name}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <TextField
    //           fullWidth
    //           label="Weight (kg)"
    //           name="weight"
    //           type="number"
    //           value={formData.weight}
    //           onChange={handleChange}
    //           inputProps={{ min: 0.1, step: 0.1 }}
    //           required
    //         />
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <FormControl fullWidth>
    //           <InputLabel>Shipping Method</InputLabel>
    //           <Select
    //             name="shippingMethod"
    //             value={formData.shippingMethod}
    //             onChange={handleChange}
    //             label="Shipping Method"
    //             required
    //           >
    //             {shippingMethods.map((method) => (
    //               <MenuItem key={method.value} value={method.value}>
    //                 {method.label}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <TextField
    //           fullWidth
    //           label="Length (cm)"
    //           name="length"
    //           type="number"
    //           value={formData.length}
    //           onChange={handleChange}
    //           inputProps={{ min: 1 }}
    //           required
    //         />
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <TextField
    //           fullWidth
    //           label="Width (cm)"
    //           name="width"
    //           type="number"
    //           value={formData.width}
    //           onChange={handleChange}
    //           inputProps={{ min: 1 }}
    //           required
    //         />
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <TextField
    //           fullWidth
    //           label="Height (cm)"
    //           name="height"
    //           type="number"
    //           value={formData.height}
    //           onChange={handleChange}
    //           inputProps={{ min: 1 }}
    //           required
    //         />
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <FormControl fullWidth>
    //           <InputLabel>Package Type</InputLabel>
    //           <Select
    //             name="packageType"
    //             value={formData.packageType}
    //             onChange={handleChange}
    //             label="Package Type"
    //             required
    //           >
    //             {packageTypes.map((type) => (
    //               <MenuItem key={type.value} value={type.value}>
    //                 {type.label}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </Grid>

    //       <Grid xs={12} sm={12}>
    //         <Button
    //           type="submit"
    //           variant="contained"
    //           color="primary"
    //           size="large"
    //           fullWidth
    //           disabled={loading}
    //         >
    //           {loading ? "Calculating..." : "Calculate Shipping Cost"}
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </form>

    //   {error && (
    //     <Box
    //       sx={{
    //         mt: 3,
    //         p: 2,
    //         backgroundColor: "error.light",
    //         color: "error.contrastText",
    //       }}
    //     >
    //       {error}
    //     </Box>
    //   )}

    //   {result && !error && (
    //     <Box
    //       sx={{
    //         mt: 3,
    //         p: 3,
    //         border: "1px solid",
    //         borderColor: "primary.main",
    //         borderRadius: 1,
    //       }}
    //     >
    //       <Typography variant="h6" gutterBottom>
    //         Shipping Estimate
    //       </Typography>
    //       <Typography>
    //         Shipping Method: <strong>{result.shippingMethod}</strong>
    //       </Typography>
    //       <Typography>
    //         Actual Weight: <strong>{result.weight} kg</strong>
    //       </Typography>
    //       <Typography>
    //         Volumetric Weight: <strong>{result.volumetricWeight} kg</strong>
    //       </Typography>
    //       <Typography>
    //         Chargeable Weight: <strong>{result.chargeableWeight} kg</strong>
    //       </Typography>
    //       <Typography variant="h5" sx={{ mt: 2 }}>
    //         Estimated Cost:{" "}
    //         <strong>
    //           {result.currency} {result.cost}
    //         </strong>
    //       </Typography>
    //       <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
    //         This is an estimate. Final cost may vary based on actual shipment
    //         details.
    //       </Typography>
    //     </Box>
    //   )}
    //   {/* </Paper> */}
    // </Container>
  );
};

export default ShippingCalculator;
