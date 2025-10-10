import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourses,
  getCourseById,
  createCourse as createCourseAPI,
  updateCourse as updateCourseAPI,
  deleteCourse as deleteCourseAPI,
} from "../../api/adminCourses";

// Async Thunks
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCourses();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch courses");
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getCourseById(courseId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch course");
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    console.log(courseData);
    try {
      const response = await createCourseAPI(courseData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create course");
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ courseId, courseData }, { rejectWithValue }) => {
    try {
      const response = await updateCourseAPI(courseId, courseData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update course");
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await deleteCourseAPI(courseId);
      return courseId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete course");
    }
  }
);

// Initial State
const initialState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Course By ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (course) => course.id === action.payload.id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearSelectedCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
