<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Kumuha ng lahat ng estudyante (Read)
    public function index()
    {
        return response()->json(Student::all());
    }

    // Mag-add ng bagong estudyante (Create)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:students',
            'course' => 'required|string',
            'year_level' => 'nullable|integer'
        ]);

        $student = Student::create($request->all());
        return response()->json($student, 201);
    }

    // Kumuha ng isang partikular na estudyante
    public function show($id)
    {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);
        
        return response()->json($student);
    }

    // I-update ang impormasyon ng estudyante (Update)
    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);

        $student->update($request->all());
        return response()->json($student);
    }

    // I-delete ang estudyante (Delete)
    public function destroy($id)
    {
        $student = Student::find($id);
        if (!$student) return response()->json(['message' => 'Student not found'], 404);

        $student->delete();
        return response()->json(['message' => 'Student deleted successfully']);
    }
}