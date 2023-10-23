<?php

namespace App\Traits;

/**
 *@Author-Name   : Erdal EROĞLU 
 *@Author-Mail   : erdal.eroglu@gmail.com
 *@Create-Date   : dd-mm-YYYY
 **/

use Erdal\Responder\ResponseDB;
use Erdal\Responder\Error;
use Erdal\Responder\Success;
use Erdal\Responder\Warning;
use Erdal\Responder\Data;

trait ResponseStorage
{

    /*
    * 
    * For Response Message Storage 
    *
    * private static $ResponseDB ResponseDB
    * 
    */

    private static ResponseDB $ResponseDB;


    /*
    *
    *  @param string $message (Not null)
    *
    *  @param int $code (Not null)
    *
    *  @param \Exception $exception (nullable)
    *
    *  @return void
    *
    */

    public static function appendError(String | array $message, \Exception $exception = null): void
    {

        if (!isset(self::$ResponseDB))
            self::$ResponseDB = new ResponseDB();

        $Error = new Error();

        $Error->set($message, null, $exception);

        self::$ResponseDB->setResponse($Error);
    }


    /** 
     *
     *  @param string $message (Not null)
     *
     *  @param int $customCode 
     *
     *  @return void
     *
     */

    public static function appendSuccess(String | array $message, int $customCode = 200): void
    {

        if (!isset(self::$ResponseDB))
            self::$ResponseDB = new ResponseDB();

        $Success = new Success();

        $Success->set($message, $customCode);

        self::$ResponseDB->setResponse($Success);
    }


    /** 
     *
     *  @param string $message (Not null)
     *
     *  @param int $customCode (Not Null)
     *
     *  @return void
     *
     */

    public static function appendWarning(String | array $message): void
    {

        if (!isset(self::$ResponseDB))
            self::$ResponseDB = new ResponseDB();

        $Warning = new Warning();

        $Warning->set($message, 0);

        self::$ResponseDB->setResponse($Warning);
    }

    /** 
     *
     *  @param string $message (Not null)
     *
     *  @return void
     *
     */

    public static function appendData(array $data): void
    {

        if (!isset(self::$ResponseDB))
            self::$ResponseDB = new ResponseDB();

        $Data = new Data();

        $Data->set($data);

        self::$ResponseDB->setResponse($Data);
    }
    /*
    *
    *
    *  @return array
    *
    */

    public static function get(): array
    {

        $retArr = [];

        if (isset(self::$ResponseDB))
            $retArr = self::$ResponseDB->getAll();

        return $retArr;
    }
}
