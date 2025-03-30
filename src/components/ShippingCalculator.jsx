import React, { useState } from "react";
import InputText from "./ui/form-control/input-text";
import InputNumber from "./ui/form-control/input-number";
import Select from "./ui/form-control/select/select";
import Container from "./ui/common/container";

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
  const [education, setEducation] = useState(educationOptions[0]);
  const [fromCity, setFromCity] = useState(fromCityOptions[1]);
  const [toCity, setToCity] = useState(toCityOptions[0]);
  const [formData, setFormData] = useState({
    originCountry: "CN",
    destinationCountry: "RU",
    weight: "",
    length: "",
    width: "",
    height: "",
    shippingMethod: "air",
    packageType: "package",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateVolumetricWeight = (length, width, height) => {
    return (length * width * height) / 5000; // Standard volumetric divisor for air freight
  };

  const calculateShipping = async () => {
    setLoading(true);
    setError("");

    try {
      // Calculate chargeable weight (greater of actual or volumetric)
      const volumetricWeight = calculateVolumetricWeight(
        parseFloat(formData.length),
        parseFloat(formData.width),
        parseFloat(formData.height)
      );

      const chargeableWeight = Math.max(
        parseFloat(formData.weight),
        volumetricWeight
      );

      // In a real app, you would call your backend API here
      // This is a mock calculation for demonstration
      let cost;
      switch (formData.shippingMethod) {
        case "air":
          cost = chargeableWeight * 4.5; // $4.5/kg for air
          break;
        case "sea":
          cost = chargeableWeight * 0.8; // $0.8/kg for sea
          break;
        case "rail":
          cost = chargeableWeight * 2.5; // $2.5/kg for rail
          break;
        case "express":
          cost = chargeableWeight * 6.0; // $6.0/kg for express
          break;
        default:
          cost = 0;
      }

      // Add origin-destination specific adjustments
      if (
        formData.originCountry === "CN" &&
        formData.destinationCountry === "RU"
      ) {
        // Special China-Russia rates
        cost *= 0.9; // 10% discount for this route
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResult({
        cost: cost.toFixed(2),
        currency: "USD",
        weight: formData.weight,
        volumetricWeight: volumetricWeight.toFixed(2),
        chargeableWeight: chargeableWeight.toFixed(2),
        shippingMethod: shippingMethods.find(
          (m) => m.value === formData.shippingMethod
        ).label,
      });
    } catch (err) {
      setError("Failed to calculate shipping. Please check your inputs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateShipping();
  };

  return (
    <Container className="my-4">
      <form onSubmit={handleSubmit} noValidate className="w-full ">
        <div className="grid grid-cols-12 md:gap-4">
          <Select
            name="fromcity"
            className="col-span-7 md:col-span-6 mb-2"
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
          />

          <InputNumber
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
          />

          <InputNumber
            className="col-span-6 md:col-span-6 mb-3 ml-1"
            textSpanClassName="border-solid border-orange-500 bg-slate-100 font-medium text-[14px] md:text-base"
            inputClassName="max-w-[68px] border border-solid border-orange-500 text-[14px] md:text-base"
            text="Масса (кг.)"
          />

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

        <div className="relative">
          <button
            type="submit"
            className="uppercase inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
          >
            {processing ? "Расчет... " : "Рассчитать"}
          </button>
        </div>
      </form>
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
