<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\ContactsProfession;
use Illuminate\Support\Facades\Storage;

class ContactController extends Controller
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
            'first_name'    => 'required|string|between:2,100',
            'last_name'     => 'required|string|between:2,100',
            'agency_id'     => 'required',
            'phone_numbers' => 'required|string|between:7,100',
            'email'         => 'required|email',
            'web'           => 'required|string|between:2,100',
        ]);

        try {
            DB::beginTransaction();

            if ($request->hasFile('avatar')) {
                $filenameWithExt = $request->file('avatar')->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('avatar')->getClientOriginalExtension();
                $fileNameToStore = $filename . '_' . time() . '.' . $extension;

                $path = $request->file('avatar')->storeAs('/image', $fileNameToStore);
            } else {
                $fileNameToStore = 'noimage.jpg';
            }

            $contact = Contact::create([
                'first_name'    => $request->first_name,
                'last_name'     => $request->last_name,
                'agency_id'     => $request->agency_id,
                'phone_numbers' => $request->phone_numbers,
                'email'         => $request->email,
                'web'           => $request->web,
                'avatar'        => $fileNameToStore,
            ]);

            if ($request->professions) {
                $professions = [];

                $professions_ids = explode(",", $request->professions);
                foreach ($professions_ids as $profession_id) {
                    $professions[] = [
                        'contact_id' => $contact->id,
                        'profession_id' => $profession_id
                    ];
                }

                ContactsProfession::insert($professions);
            }


            DB::commit();

            $response = [
                'status'    => 'success',
                'code'      => 200
            ];
        } catch (Exception $e) {
            DB::rollBack();

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
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        $contactData = $contact->toArray();
        $contactData['professions'] = [];
        foreach ($contact->professions()->toArray() as $profession) {
            $contactData['professions'][] = [
                'id' => $profession['id'],
                'name' => $profession['name'],
            ];
        }

        return response()->json([$contactData]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact)
    {
        $request->validate([
            'first_name'    => 'required|string|between:2,100',
            'last_name'     => 'required|string|between:2,100',
            'agency_id'     => 'required',
            'phone_numbers' => 'required|string|between:7,100',
            'email'         => 'required|email',
            'web'           => 'required|string|between:2,100',
        ]);

        try {
            if ($request->hasFile('avatar')) {
                $filenameWithExt = $request->file('avatar')->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('avatar')->getClientOriginalExtension();
                $fileNameToStore = $filename . '_' . time() . '.' . $extension;

                $path = $request->file('avatar')->storeAs('/image', $fileNameToStore);
            } else {
                $fileNameToStore = 'noimage.jpg';
            }

            $contact->first_name    = $request->first_name;
            $contact->last_name     = $request->last_name;
            $contact->agency_id     = $request->agency_id;
            $contact->phone_numbers = $request->phone_numbers;
            $contact->email         = $request->email;
            $contact->web           = $request->web;
            $contact->avatar        = $fileNameToStore;

            $contact->save();

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
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        try {
            $contact->delete();

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
}
