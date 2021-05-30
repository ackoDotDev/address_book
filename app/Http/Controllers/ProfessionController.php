<?php

namespace App\Http\Controllers;

use App\Models\Profession;

class ProfessionController extends Controller
{

    /**
     * Return json with all professions
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function professions()
    {
        $professions = Profession::all();

        $response['professions'] = [];
        foreach ($professions as $profession) {
            $response['professions'][] = [
                'value' => $profession->id,
                'label' => $profession->name
            ];
        }

        return response()->json($response);
    }
}
