<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AgencyController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|between:2,100',
            'address'      => 'required|string|between:2,100',
            'city_id'       => 'required',
            'phone_numbers' => 'required|string|between:7,100',
            'email'         => 'required|email',
            'web'           => 'required|string|between:2,100',
        ]);

        try {
            Agency::create([
                'name'          => $request->name,
                'address'       => $request->address,
                'city_id'       => $request->city_id,
                'phone_numbers' => $request->phone_numbers,
                'email'         => $request->email,
                'web'           => $request->web
            ]);

            $response = [
                'status'    => 'success',
                'code'      => 200
            ];
        } catch (Exception $e) {

            $response = [
                'status'    => 'error',
                'code'      => 400,
                'error'     => $e->getMessage()
            ];
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function show(Agency $agency)
    {
        $agencyData = $agency->toArray();
        $agencyData['contacts'] = $agency->contacts()->toArray();
        $agencyData['city'] = $agency->city()->toArray();

        return response()->json([$agencyData]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Agency $agency)
    {
        $request->validate([
            'name'     => 'required|string|between:2,100',
            'address'      => 'required|string|between:2,100',
            'city_id'       => 'required',
            'phone_numbers' => 'required|string|between:7,100',
            'email'         => 'required|email',
            'web'           => 'required|string|between:2,100',
        ]);

        try {
            $agency->name          = $request->name;
            $agency->address       = $request->address;
            $agency->city_id       = $request->city_id;
            $agency->phone_numbers = $request->phone_numbers;
            $agency->email         = $request->email;
            $agency->web           = $request->web;

            $agency->save();

            $response = [
                'status'    => 'success',
                'code'      => 200
            ];
        } catch (Exception $e) {
            $response = [
                'status'    => 'error',
                'code'      => 400,
                'error'     => $e->getMessage()
            ];
        }

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function destroy(Agency $agency)
    {
        try {
            $agency->delete();

            $response = [
                'status'    => 'success',
                'code'      => 200
            ];
        } catch (Exception $e) {
            $response = [
                'status'    => 'error',
                'code'      => 400,
                'error'     => $e->getMessage()
            ];
        }

        return response()->json($response);
    }

    /**
     * Return list with all agencies.
     *
     * @param  \App\Model\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function list()
    {

        $agencies = Agency::all();

        $agenciesData = [];

        foreach ($agencies as $key => $agency) {
            $agenciesData[$key] = $agency->toArray();
            $agenciesData[$key]['city'] = $agency->city()->toArray();
            $agenciesData[$key]['contacts'] = [];

            foreach ($agency->contacts() as $contactKey => $contact) {
                $agenciesData[$key]['contacts'][$contactKey] = $contact->toArray();

                foreach ($contact->professions()->toArray() as $profession) {
                    $agenciesData[$key]['contacts'][$contactKey]['professions'][] = [
                        'id' => $profession['id'],
                        'name' => $profession['name'],
                    ];
                }
            }
        }

        return response()->json($agenciesData);
    }
}
