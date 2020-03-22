import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import CategoryFilter from '../common/category-filter';
import SubCategoryFilter from '../common/sub-category-filter';
import { useUser } from '../../context/user';


const useStyles = makeStyles({
  paper: {
    maxWidth: '500',
    margin: 'auto',
  },
  root: {
    marginTop: 30
  },
  title: {
    textAlign: 'center'
  },
  error: {
    color: 'red'
  }
});

const Profile = ({ isSignup }) => {
  const { methods:  { signUp, isAdmin, updateProfile }, data: { currentUser } } = useUser();
  const [category, setCategory] = useState(currentUser.category && currentUser.category.id || 0);
  const [subCategory, setSubCategory] = useState(currentUser.subCategory && currentUser.subCategory.id || 0);
  let validationSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    category: yup.number().test('Categpru-test', 'Category is required when role is no a admin', 
      function(value) {
        return isAdmin() || value !== 0;
      }),
    subCategory: yup.number().test('SubCategory-test', 'SubCategory is required when role is not a admin', 
      function(value) {
        return isAdmin() || value !== 0;
      }),
  });

  if(isSignup)
  {
    validationSchema = yup.object().shape({
      first_name: yup.string().required("First Name is required"),
      last_name: yup.string().required("Last Name is required"),
      email: yup.string().email().required("Email is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      password: yup.string().min(8).required('Password is required'),
      passwordRepeat: yup.string().min(8).oneOf([yup.ref('password')], 'Passwords must match'),
      category: yup.number().test('Categpru-test', 'Category is required when role is no a admin', 
        function(value) {
          return isAdmin() || value !== 0;
        }),
      subCategory: yup.number().test('SubCategory-test', 'SubCategory is required when role is not a admin', 
        function(value) {
          return isAdmin() || value !== 0;
        }),
    });
  }
  const { handleSubmit, control, errors, setValue, register } = useForm({
    validationSchema,
    defaultValues: {
      ...currentUser,
      category: currentUser.category && currentUser.category.id || 0,
      sub_category: currentUser.subCategory && currentUser.subCategory.id || 0,
    }
  });
  const classes = useStyles();
  useEffect(() => {
    register({ name: 'category' });
    register({ name: 'sub_category' });
  }, [register]);
  const handleChangeCategory = category => {
    setCategory(category);
    setValue('category', category);
  };
  
  const handleSubCategoryChange = subCategory => {
    setSubCategory(subCategory);
    setValue('sub_category', subCategory);
  }
  
  const submit = (values) => {
    if (isSignup) {
      signUp(values);
    } else { 
      updateProfile(values);
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          {!isSignup ? "User Prorile" : "Sign Up"}
        </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Paper style={{padding: '20px', width: '500px'}} className={classes.paper}>
            <Grid spacing={4} container >
              <Grid item xs={6}>
                <Controller
                  name="first_name"
                  control={control}
                  as={
                    <TextField
                      error={errors.first_name}
                      type="text"
                      label="First Name"
                      fullWidth
                      defaultValue={currentUser.first_name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="last_name"
                  control={control}
                  as={
                    <TextField
                      error={errors.last_name}
                      type="text"
                      label="Last Name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={currentUser.last_name}
                      fullWidth
                    />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  as={
                    <TextField
                      error={errors.email}
                      type="email"
                      label="Email"
                      defaultValue={currentUser.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />}
                />
              </Grid>
              {isSignup ? <>
                <Grid item xs={6}>
                  <Controller
                    name="password"
                    control={control}
                    as={
                      <TextField
                        error={errors.password}
                        type="password"
                        label="Password"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="passwordRepeat"
                    control={control}
                    as={
                      <TextField
                        error={errors.passwordRepeat}
                        type="password"
                        label="Password Repeat"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />}
                  />
                </Grid> 
              </> : null }
              <Grid item xs={6}>
                <CategoryFilter
                  variant="" 
                  defaultValue={category}
                  error={errors.category}
                  onChangeHanlder={handleChangeCategory}
                />
              </Grid>
              <Grid item xs={6}>
                <SubCategoryFilter
                  variant=""
                  defaultValue={subCategory}
                  category={category}
                  error={errors.subCategory}
                  onChangeHanlder={handleSubCategoryChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="country"
                  control={control}
                  as={
                    <TextField
                      error={errors.country}
                      defaultValue={currentUser.country}
                      type="country"
                      label="Country"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="city"
                  control={control}
                  as={
                    <TextField
                      error={errors.city}
                      defaultValue={currentUser.city}
                      type="city"
                      label="City"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
              </Grid>

            <Grid item xs={6}>
            {!isSignup ? 
              <Button type="submit" fullWidth variant="contained" color="primary">Update Profile</Button>
              :
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>}
            </Grid>
            <Grid item xs={6}>
            {!isSignup ? 
              <Button type="button" fullWidth variant="contained" color="secondary"><Link to='/password-change'>Change Password</Link></Button>
              :
              <Button type="button" fullWidth variant="outlined" color="secondary"><Link to="/login">Login</Link></Button>}
            </Grid>
            </Grid>
          </Paper>
        </form>
    </div>
  )
};

export default Profile;